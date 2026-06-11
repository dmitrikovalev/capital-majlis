-- Membership inquiry submissions from the landing page form.
-- Anon users may insert only; reads are restricted to authenticated roles.

create table public.membership_requests (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null    default now(),
  name        text        not null,
  email       text        not null,
  phone       text        not null,
  cars        text        not null,
  referred_by text
);

alter table public.membership_requests enable row level security;

-- Public landing page can submit a new request (no auth required).
create policy "anon_insert"
  on public.membership_requests
  for insert
  to anon
  with check (true);

-- Only authenticated users (admins) can read submissions.
create policy "auth_select"
  on public.membership_requests
  for select
  to authenticated
  using (true);
