-- Vehicle registration certificate uploads attached to membership requests.
-- The image is stored in a private bucket; only the stored object path is kept
-- on the request row. Reads are restricted to authenticated (admin) users.

-- Private bucket. 10 MB cap, image mime types only (incl. iOS HEIC/HEIF camera output).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'vehicle-registrations',
  'vehicle-registrations',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
on conflict (id) do nothing;

-- Public landing page (anon) may upload a certificate, but cannot read, list,
-- update or delete objects — write-only, same trust model as the form insert.
create policy "anon_upload_vehicle_registrations"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'vehicle-registrations');

-- Only authenticated users (admins) can read uploaded certificates.
create policy "auth_read_vehicle_registrations"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'vehicle-registrations');

-- Track the uploaded certificate's storage path on the request row.
alter table public.membership_requests
  add column registration_doc_path text;

alter table public.membership_requests
  add constraint registration_doc_path_length
    check (char_length(registration_doc_path) <= 300);
