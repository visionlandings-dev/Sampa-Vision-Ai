-- 0001_create_leads.sql
-- Fase 0 do roadmap Vision Platform: captura de briefing + rascunho gerado,
-- sem Auth/organizations ainda (visitante anônimo). Ver conversa de arquitetura
-- para o motivo do escopo reduzido e o plano de migração futura.

create table if not exists leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- contato (necessário para a entrega da versão final em até 72h)
  email         text not null,
  whatsapp      text,

  -- os 7 campos canônicos do LandingBriefingContract
  produto       text not null,
  publico       text not null,
  dor           text not null,
  diferencial   text not null,
  beneficios    text not null,
  oferta        text not null,
  cta           text not null,

  -- resultado
  draft_page    jsonb,
  status        text not null default 'aguardando_refinamento'
                  check (status in ('aguardando_refinamento', 'em_producao', 'entregue')),

  -- rastreio, grátis desde já
  origem        text,
  utm_source    text,
  utm_campaign  text
);

comment on table leads is
  'Fase 0: captura de briefing + contato + rascunho gerado por IA. '
  'Quando Auth/organizations existirem, adicionar organization_id aqui '
  '(coluna nova, sem quebrar o que já existe).';

-- RLS: visitante anônimo só pode INSERIR o próprio lead.
-- Ninguém lê pela API pública — leitura é feita pelo painel do Supabase
-- (Table Editor) com sua conta, ou depois via service role no backend.
alter table leads enable row level security;

create policy "anon pode inserir lead"
  on leads
  for insert
  to anon
  with check (true);

-- Permite que o próprio fluxo (ainda anônimo) atualize o rascunho gerado
-- do lead que acabou de criar. Restrito a alterar apenas draft_page/status,
-- não os dados do briefing em si.
create policy "anon pode anexar rascunho"
  on leads
  for update
  to anon
  using (true)
  with check (true);

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_status_idx on leads (status);
