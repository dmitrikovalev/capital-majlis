-- Add length constraints to prevent oversized payloads from bots / abuse.
-- Limits match realistic human input; violations are rejected at the DB level
-- even if the client-side check is bypassed.

alter table public.membership_requests
  add constraint name_length        check (char_length(name)        between 2 and 200),
  add constraint email_length       check (char_length(email)       between 5 and 254),
  add constraint phone_length       check (char_length(phone)       between 5 and 30),
  add constraint cars_length        check (char_length(cars)        between 2 and 500),
  add constraint referred_by_length check (char_length(referred_by) <= 200);
