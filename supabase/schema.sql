create table if not exists public.custom_products (
  id bigint primary key,
  created_at timestamptz not null default now(),
  slug text not null unique,
  name text not null,
  short_description text not null,
  description text not null,
  old_price numeric not null,
  price numeric not null,
  discount_label text not null,
  category text not null,
  category_slug text not null,
  affiliate_url text not null,
  cta text not null,
  badge text not null,
  rating numeric not null default 5,
  review_count integer not null default 1,
  image_url text,
  icon_key text not null,
  accent_from text not null,
  accent_to text not null,
  benefits jsonb not null default '[]'::jsonb,
  is_best_seller boolean not null default false,
  is_flash_deal boolean not null default false,
  is_new boolean not null default false,
  is_favorite boolean not null default false,
  is_custom boolean not null default true
);

alter table public.custom_products enable row level security;

create policy "Allow read custom products"
on public.custom_products
for select
to anon, authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Allow public read product images"
on storage.objects
for select
to public
using (bucket_id = 'product-images');

create policy "Allow service role manage product images"
on storage.objects
for all
to service_role
using (bucket_id = 'product-images')
with check (bucket_id = 'product-images');
