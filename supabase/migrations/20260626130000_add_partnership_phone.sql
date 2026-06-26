-- Add a phone number to partnership inquiries (collected on the /partner form,
-- mirroring the membership request contact details).
alter table public.partnership_inquiries
  add column if not exists phone text;

alter table public.partnership_inquiries
  add constraint phone_length check (char_length(phone) between 5 and 30);
