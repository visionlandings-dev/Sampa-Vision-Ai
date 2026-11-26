-- Sampa-Core (bwzojcgptaitbhxrhoap) · migration "vision_leads_multiorigem_e_events"
-- JÁ APLICADA em 2026-11-25. Versionada aqui para manter as migrations como fonte única.

-- 1) LEADS: um único funil para o app (sampa.vision) e a landing (try.sampa.vision)
alter table vision.leads
  add column if not exists utm_medium   text,
  add column if not exists utm_content  text,
  add column if not exists utm_term     text,
  add column if not exists variante     text,
  add column if not exists session_id   text,
  add column if not exists anon_id      text,
  add column if not exists pagina       text,
  add column if not exists referrer     text,
  add column if not exists user_agent   text,
  add column if not exists nome         text,
  add column if not exists empresa      text,
  add column if not exists site_atual   text,
  add column if not exists objetivo     text,
  add column if not exists prazo        text,
  add column if not exists investimento text,
  add column if not exists mensagem     text,
  add column if not exists consentimento_lgpd boolean not null default false,
  add column if not exists consentimento_em   timestamptz;

update vision.leads set origem = 'app' where origem is null;
alter table vision.leads alter column origem set default 'app';
alter table vision.leads alter column origem set not null;
alter table vision.leads add constraint leads_origem_check check (origem in ('app','try'));

-- Campos do briefing do app deixam de ser NOT NULL na coluna,
-- mas continuam obrigatórios para origem = 'app'
alter table vision.leads
  alter column produto drop not null, alter column publico drop not null,
  alter column dor drop not null, alter column diferencial drop not null,
  alter column beneficios drop not null, alter column oferta drop not null,
  alter column cta drop not null;

alter table vision.leads add constraint leads_app_briefing_completo check (
  origem <> 'app' or (produto is not null and publico is not null and dor is not null
    and diferencial is not null and beneficios is not null and oferta is not null and cta is not null));
alter table vision.leads add constraint leads_try_minimo check (
  origem <> 'try' or (nome is not null and objetivo is not null and consentimento_lgpd));
alter table vision.leads add constraint leads_email_formato check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and length(email) <= 254);
alter table vision.leads add constraint leads_tamanhos check (
  coalesce(length(mensagem),0) <= 4000 and coalesce(length(objetivo),0) <= 2000
  and coalesce(length(nome),0) <= 200 and coalesce(length(empresa),0) <= 200);

create index if not exists leads_origem_created_idx on vision.leads (origem, created_at desc);

-- 2) EVENTS: analytics de primeira parte dos dois produtos
create table if not exists vision.events (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  origem      text not null check (origem in ('app','try')),
  evento      text not null check (evento ~ '^[a-z0-9_]{2,64}$'),
  variante    text check (length(variante) <= 64),
  session_id  text check (length(session_id) <= 64),
  anon_id     text check (length(anon_id) <= 64),
  pagina      text check (length(pagina) <= 512),
  referrer    text check (length(referrer) <= 1024),
  utm_source   text check (length(utm_source)   <= 200),
  utm_medium   text check (length(utm_medium)   <= 200),
  utm_campaign text check (length(utm_campaign) <= 200),
  utm_content  text check (length(utm_content)  <= 200),
  utm_term     text check (length(utm_term)     <= 200),
  props       jsonb not null default '{}'::jsonb check (pg_column_size(props) <= 4096),
  user_agent  text check (length(user_agent) <= 512)
);
create index if not exists events_origem_evento_created_idx on vision.events (origem, evento, created_at desc);
create index if not exists events_session_idx on vision.events (session_id);

alter table vision.events enable row level security;
create policy "anon pode registrar evento" on vision.events
  for insert to anon, authenticated with check (true);

grant usage on schema vision to anon, authenticated, service_role;
grant insert on vision.events to anon, authenticated;
grant all on vision.events to service_role;
grant insert on vision.leads to authenticated;
grant all on vision.leads to service_role;

-- 3) Visão rápida do funil (só service_role / painel)
create or replace view vision.funil_diario with (security_invoker = true) as
select date_trunc('day', created_at)::date as dia, origem, evento, variante,
       count(*) as total, count(distinct session_id) as sessoes
from vision.events group by 1,2,3,4;
revoke all on vision.funil_diario from anon, authenticated;
