-- ═══════════════════════════════════════════════════════════════════════════════
-- BIG PHONE — Supabase Schema (safe to re-run)
-- ═══════════════════════════════════════════════════════════════════════════════

create extension if not exists "uuid-ossp";

-- ─── ENUMS (safe) ────────────────────────────────────────────────────────────────────
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

-- ─── BRANDS ────────────────────────────────────────────────────────────────────────────
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

-- ─── PRODUCTS ───────────────────────────────────────────────────────────────────────────
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

-- ─── FUNCTIONS & TRIGGERS ────────────────────────────────────────────────────────────
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

-- ─── RFQ ────────────────────────────────────────────────────────────────────────────────
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

-- ─── ROW LEVEL SECURITY ────────────────────────────────────────────────────────────────
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

-- ─── SEED BRANDS (skip if already exist) ─────────────────────────────────────────────────
insert into brands (id, name, slug, description, is_active, sort_order) values
  ('00000000-0000-0000-0000-000000000001', 'Apple',   'apple',   'Premium iPhones, iPads, Apple Watch & AirPods', true, 1),
  ('00000000-0000-0000-0000-000000000002', 'Samsung', 'samsung', 'Galaxy Series smartphones and tablets',         true, 2),
  ('00000000-0000-0000-0000-000000000003', 'Xiaomi',  'xiaomi',  'Xiaomi, Redmi and POCO devices',                true, 3),
  ('00000000-0000-0000-0000-000000000004', 'Huawei',  'huawei',  'Huawei P and Mate series',                      true, 4),
  ('00000000-0000-0000-0000-000000000005', 'Oppo',    'oppo',    'Oppo Find and Reno series',                     true, 5),
  ('00000000-0000-0000-0000-000000000006', 'Vivo',    'vivo',    'Vivo X and V series smartphones',               true, 6)
on conflict (id) do nothing;

-- ─── MIGRATIONS (safe to re-run on existing databases) ─────────────────────────────────────
alter table products add column if not exists price_aed  numeric(10,2);
alter table products add column if not exists show_price boolean not null default true;