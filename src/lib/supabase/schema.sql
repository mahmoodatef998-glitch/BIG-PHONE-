-- ═══════════════════════════════════════════════════════════════════════════════
-- BIG PHONE — Supabase Schema (safe to re-run)
-- ═══════════════════════════════════════════════════════════════════════════════

create extension if not exists "uuid-ossp";

do $$ begin
  create type condition_type as enum (
    'brand-new', 'refurbished-grade-a', 'refurbished-grade-b', 'certified-refurbished'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type category_type as enum (
    'smartphone', 'tablet', 'accessory', 'smartwatch', 'airpods'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type rfq_status as enum (
    'new', 'contacted', 'quoted', 'closed'
  );
exception when duplicate_object then null;
end $$;

create table if not exists brands (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  slug          text not null unique,
  logo_url      text,
  banner_url    text,
  description   text,
  product_count integer not null default 0,
  is_active     boolean not null default true,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists brands_slug_idx on brands (slug);
create index if not exists brands_sort_idx on brands (sort_order) where is_active = true;

create table if not exists products (
  id                 uuid primary key default uuid_generate_v4(),
  brand_id           uuid not null references brands (id) on delete restrict,
  name               text not null,
  slug               text not null unique,
  model              text not null,
  category           category_type not null,
  subcategory        text,
  condition          condition_type not null,
  storage            text,
  color              text,
  battery_health     smallint check (battery_health between 0 and 100),
  warranty           text,
  stock_quantity     integer not null default 0 check (stock_quantity >= 0),
  moq                integer not null default 1 check (moq >= 1),
  country_of_origin  text not null default 'UAE',
  description        text,
  specifications     jsonb,
  images             text[] not null default '{}',
  price_aed          numeric(10,2),
  show_price         boolean not null default true,
  is_featured        boolean not null default false,
  is_active          boolean not null default true,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists products_slug_idx      on products (slug);
create index if not exists products_brand_idx     on products (brand_id);
create index if not exists products_category_idx  on products (category) where is_active = true;
create index if not exists products_condition_idx on products (condition) where is_active = true;
create index if not exists products_featured_idx  on products (is_featured) where is_active = true;
create index if not exists products_stock_idx     on products (stock_quantity) where is_active = true;
create index if not exists products_fts_idx on products
  using gin (to_tsvector('english', name || ' ' || model || ' ' || coalesce(description, '')));

create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_updated_at on products;
create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at();

create or replace function sync_brand_product_count()
returns trigger language plpgsql as $$
begin
  if tg_op = 'DELETE' then
    update brands set product_count = (
      select count(*) from products where brand_id = old.brand_id and is_active = true
    ) where id = old.brand_id;
  else
    update brands set product_count = (
      select count(*) from products where brand_id = new.brand_id and is_active = true
    ) where id = new.brand_id;
  end if;
  return null;
end;
$$;

drop trigger if exists sync_brand_count on products;
create trigger sync_brand_count
  after insert or update or delete on products
  for each row execute function sync_brand_product_count();

create table if not exists rfqs (
  id               uuid primary key default uuid_generate_v4(),
  company_name     text not null,
  contact_person   text not null,
  country          text not null,
  phone            text not null,
  email            text not null,
  product_interest text,
  quantity         integer check (quantity > 0),
  message          text,
  status           rfq_status not null default 'new',
  created_at       timestamptz not null default now()
);

create index if not exists rfqs_status_idx  on rfqs (status);
create index if not exists rfqs_email_idx   on rfqs (email);
create index if not exists rfqs_created_idx on rfqs (created_at desc);

alter table brands   enable row level security;
alter table products enable row level security;
alter table rfqs     enable row level security;

drop policy if exists "Public can read active brands"   on brands;
drop policy if exists "Public can read active products" on products;
drop policy if exists "Anyone can submit RFQ"           on rfqs;

create policy "Public can read active brands"
  on brands for select using (is_active = true);

create policy "Public can read active products"
  on products for select using (is_active = true);

create policy "Anyone can submit RFQ"
  on rfqs for insert with check (true);

insert into brands (id, name, slug, description, is_active, sort_order) values
  ('00000000-0000-0000-0000-000000000001', 'Apple',   'apple',   'Premium iPhones, iPads, Apple Watch & AirPods', true, 1),
  ('00000000-0000-0000-0000-000000000002', 'Samsung', 'samsung', 'Galaxy Series smartphones and tablets',         true, 2),
  ('00000000-0000-0000-0000-000000000003', 'Xiaomi',  'xiaomi',  'Xiaomi, Redmi and POCO devices',                true, 3),
  ('00000000-0000-0000-0000-000000000004', 'Huawei',  'huawei',  'Huawei P and Mate series',                      true, 4),
  ('00000000-0000-0000-0000-000000000005', 'Oppo',    'oppo',    'Oppo Find and Reno series',                     true, 5),
  ('00000000-0000-0000-0000-000000000006', 'Vivo',    'vivo',    'Vivo X and V series smartphones',               true, 6)
on conflict (slug) do update set
  name        = excluded.name,
  description = excluded.description,
  is_active   = excluded.is_active,
  sort_order  = excluded.sort_order;

create table if not exists collections (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  slug        text not null unique,
  description text,
  image_url   text,
  sort_order  integer not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists collections_slug_idx on collections (slug);
create index if not exists collections_sort_idx on collections (sort_order) where is_active = true;

drop trigger if exists collections_updated_at on collections;
create trigger collections_updated_at
  before update on collections
  for each row execute function update_updated_at();

-- site_settings: migrate legacy tables to key/value schema (safe to re-run)
do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'site_settings'
  ) then
    -- Common legacy column names → rename in place
    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'site_settings' and column_name = 'setting_key'
    ) and not exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'site_settings' and column_name = 'key'
    ) then
      alter table site_settings rename column setting_key to key;
    end if;

    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'site_settings' and column_name = 'setting_value'
    ) and not exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'site_settings' and column_name = 'value'
    ) then
      alter table site_settings rename column setting_value to value;
    end if;

    -- Still wrong shape (e.g. id/name/value rows) → recreate; defaults are re-seeded below
    if not exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'site_settings' and column_name = 'key'
    ) or not exists (
      select 1 from information_schema.columns
      where table_schema = 'public' and table_name = 'site_settings' and column_name = 'value'
    ) then
      drop table site_settings;
    end if;
  end if;
end $$;

create table if not exists site_settings (
  key        text primary key,
  value      text,
  updated_at timestamptz not null default now()
);

alter table site_settings add column if not exists value text;
alter table site_settings add column if not exists updated_at timestamptz not null default now();

drop trigger if exists site_settings_updated_at on site_settings;
create trigger site_settings_updated_at
  before update on site_settings
  for each row execute function update_updated_at();

alter table collections enable row level security;
alter table site_settings enable row level security;

drop policy if exists "Public can read active collections" on collections;
create policy "Public can read active collections"
  on collections for select using (is_active = true);

-- MIGRATIONS (safe to re-run)
alter table products add column if not exists price_aed  numeric(10,2);
alter table products add column if not exists show_price boolean not null default true;
alter table products add column if not exists collection_id uuid references collections (id) on delete set null;

create index if not exists products_collection_idx on products (collection_id) where is_active = true;

insert into collections (id, name, slug, description, sort_order, is_active) values
  ('00000000-0000-0000-0000-000000000101', 'New Arrivals',      'new-arrivals',      'Latest additions to our wholesale catalog', 1, true),
  ('00000000-0000-0000-0000-000000000102', 'Best Sellers',      'best-sellers',      'Most popular wholesale items',              2, true),
  ('00000000-0000-0000-0000-000000000103', 'Accessories',       'accessories',       'Chargers, cables, earphones & more',        3, true),
  ('00000000-0000-0000-0000-000000000104', 'Refurbished Deals', 'refurbished-deals', 'Grade A and certified refurbished',        4, false)
on conflict (slug) do update set
  name        = excluded.name,
  description = excluded.description,
  sort_order  = excluded.sort_order,
  is_active   = excluded.is_active;

insert into site_settings (key, value) values
  ('store_name',           'BIG PHONE'),
  ('store_tagline',        'Wholesale Mobile Phones & Devices'),
  ('contact_email',        'sales@bigphone.ae'),
  ('whatsapp_number',      '971500000000'),
  ('whatsapp_message',     'Hello, I''m interested in a wholesale quote.'),
  ('currency',             'AED'),
  ('moq_display',          'show-all'),
  ('rfq_notifications',    'true'),
  ('notification_email',   'admin@bigphone.ae')
on conflict (key) do nothing;
