-- Defense-in-depth for legacy or partially initialized environments.
--
-- The secure baseline in migration 0001 does not create an anonymous UPDATE
-- policy. These statements remain idempotent to harden databases that may
-- have received the historical permissive policy.

drop policy if exists "anon pode anexar rascunho" on public.leads;

revoke update on table public.leads from anon;

comment on column public.leads.draft_page is
  'Reserved for trusted backend production flows; anonymous updates are denied.';
