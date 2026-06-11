-- Allow the anon role to insert rows (RLS policy alone is not enough without this grant).
grant insert on public.membership_requests to anon;

-- Allow authenticated role to read all rows.
grant select on public.membership_requests to authenticated;
