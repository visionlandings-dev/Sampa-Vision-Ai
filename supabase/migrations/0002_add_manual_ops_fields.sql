-- 0002_add_manual_ops_fields.sql
-- Suporte à operação manual da fase de produção (sem dashboard/login ainda).
-- A equipe atualiza esses campos direto no Table Editor do Supabase.

alter table leads
  add column if not exists final_url    text,
  add column if not exists delivered_at timestamptz,
  add column if not exists notes        text;

comment on column leads.final_url is
  'Link da página final, preenchido manualmente pela equipe ao publicar.';
comment on column leads.delivered_at is
  'Preenchido manualmente quando o e-mail de entrega é enviado ao cliente.';
comment on column leads.notes is
  'Anotações internas da equipe sobre a produção deste lead (não visível ao cliente).';
