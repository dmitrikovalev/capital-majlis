-- Partnership inquiry submissions from the dedicated /partner page.
-- Same trust model as membership_requests: anon may insert only, reads are
-- restricted to authenticated (admin) roles. An optional attachment (image,
-- PDF or presentation deck) is stored in a private, write-only bucket and only
-- the stored object path is kept on the row.

create table public.partnership_inquiries (
  id              uuid        primary key default gen_random_uuid(),
  created_at      timestamptz not null    default now(),
  name            text        not null,
  email           text        not null,
  company         text,
  subject         text        not null,
  message         text        not null,
  attachment_path text,

  constraint name_length            check (char_length(name)            between 2 and 200),
  constraint email_length           check (char_length(email)           between 5 and 254),
  constraint company_length         check (char_length(company)         <= 200),
  constraint subject_length         check (char_length(subject)         between 2 and 200),
  constraint message_length         check (char_length(message)         between 10 and 5000),
  constraint attachment_path_length check (char_length(attachment_path) <= 300)
);

alter table public.partnership_inquiries enable row level security;

-- Public partner page can submit a new inquiry (no auth required).
create policy "anon_insert"
  on public.partnership_inquiries
  for insert
  to anon
  with check (true);

-- Only authenticated users (admins) can read submissions.
create policy "auth_select"
  on public.partnership_inquiries
  for select
  to authenticated
  using (true);

-- RLS policies alone are not enough without the underlying grants.
grant insert on public.partnership_inquiries to anon;
grant select on public.partnership_inquiries to authenticated;

-- Private bucket for partnership attachments. 15 MB cap to accommodate
-- presentation decks; images, PDF and PowerPoint mime types only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'partnership-attachments',
  'partnership-attachments',
  false,
  15728640,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ]
)
on conflict (id) do nothing;

-- Public partner page (anon) may upload an attachment, but cannot read, list,
-- update or delete objects — write-only, same trust model as the form insert.
create policy "anon_upload_partnership_attachments"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'partnership-attachments');

-- Only authenticated users (admins) can read uploaded attachments.
create policy "auth_read_partnership_attachments"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'partnership-attachments');
