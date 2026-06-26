-- Showcase videos rendered in the Digital Presence section.
-- Publicly readable so the landing page can list them without auth;
-- writes happen via the Supabase dashboard / authenticated admins only.

create table public.videos (
  id          uuid        primary key default gen_random_uuid(),
  created_at  timestamptz not null    default now(),
  youtube_id  text        not null,
  title       text        not null,
  sort_order  integer     not null    default 0,
  published   boolean     not null    default true
);

-- Default ordering for the grid: explicit sort_order, then newest first.
create index videos_order_idx on public.videos (sort_order, created_at desc);

alter table public.videos enable row level security;

-- Anyone (anon) may read published videos.
create policy "public_select_published"
  on public.videos
  for select
  to anon, authenticated
  using (published = true);

grant select on public.videos to anon, authenticated;

-- Seed with the videos previously hard-coded in Digital.tsx.
insert into public.videos (youtube_id, title, sort_order) values
  ('rJg3GHjseHM', 'ADMSOC Porsche',      10),
  ('oLFahxr_vwA', 'ADMSOC Ferrari',      20),
  ('Ixu_jyDWNSg', 'ADMSOC Porsche',      30),
  ('5q4FbDq-QVg', 'ADMSOC Lexus',        40),
  ('XUlCYPA5gz8', 'ADMSOC Aston Martin', 50),
  ('9MNjYVKjsxs', 'ADMSOC Mercedes',     60);
