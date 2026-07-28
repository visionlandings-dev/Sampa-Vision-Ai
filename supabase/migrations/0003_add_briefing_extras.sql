-- 0003_add_briefing_extras.sql
-- Extensão opcional ao LandingBriefingContract (seção 10: "Extensibilidade").
-- Não altera os 7 campos obrigatórios do contrato — são colunas nullable,
-- preenchidas só quando o visitante decide responder.

alter table leads
  add column if not exists concorrentes text,
  add column if not exists referencia   text;

comment on column leads.concorrentes is
  'Opcional. Concorrentes indicados pelo cliente, usado para calibrar o prompt da IA e, futuramente, o perfil de marca (Vision Branding/Intelligence).';
comment on column leads.referencia is
  'Opcional. Marca/referência de padrão desejado, mesmo uso que concorrentes.';
