-- Security hardening: an anonymous browser must never update lead records.
--
-- Migration 0001 allowed every `anon` request to update every row because
-- both the USING and WITH CHECK expressions were `true`. PostgreSQL RLS
-- cannot infer that a UUID stored by a browser identifies the original
-- submitter, nor can that policy restrict updates to selected columns.
--
-- Draft persistence is intentionally disabled until it is moved behind a
-- trusted server-side boundary with an explicit capability or authenticated
-- ownership model. Lead intake through INSERT remains unchanged.

drop policy if exists "anon pode anexar rascunho" on public.leads;

revoke update on table public.leads from anon;

comment on column public.leads.draft_page is
  'Reserved for trusted backend production flows; anonymous updates are denied.';
