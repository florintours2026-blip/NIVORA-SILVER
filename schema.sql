-- NIVORA SILVER database blueprint
-- Run this in Supabase SQL Editor. Review tax/legal settings for your jurisdiction.
extension if not exists pgcrypto;

create type public.product_status as enum ('draft','active','hidden','archived');
create type public.order_status as enum ('pending_payment','paid','processing','supplier_ordered','shipped','delivered','cancelled','refunded');
create type public.payment_status as enum ('unpaid','pending','paid','failed','refunded');
create type public.event_type as enum ('view_product','search','favorite_add','cart_add','checkout_start','purchase');

create table if not exists public.store_settings (
  id uuid primary key default gen_random_uuid(),
  store_name text not null default 'NIVORA SILVER',
  currency text not null default 'SAR',
  locale text not null default 'ar-SA',
  admin_email text,
  support_email text,
  support_phone text,
  cash_on_delivery_enabled boolean not null default false,
  advance_payment_required boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_ar text not null,
  name_en text,
  description_ar text,
  image_url text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  source_url text,
  source_platform text,
  external_product_id text,
  brand text default 'NIVORA',
  name_ar text not null,
  name_en text,
  slug text unique not null,
  category text not null,
  description_ar text,
  description_en text,
  specifications jsonb not null default '{}'::jsonb,
  images jsonb not null default '[]'::jsonb,
  variants jsonb not null default '[]'::jsonb,
  cost_price numeric(12,2) not null default 0,
  shipping_cost numeric(12,2) not null default 0,
  price numeric(12,2) not null default 0,
  compare_at_price numeric(12,2),
  margin_percent numeric(7,2),
  stock_qty integer not null default 0,
  low_stock_threshold integer not null default 5,
  sku text unique,
  status public.product_status not null default 'draft',
  featured boolean not null default false,
  supplier_last_checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  full_name text,
  phone text,
  country text,
  created_at timestamptz not null default now(),
  last_seen_at timestamptz,
  marketing_opt_in boolean not null default false
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  customer_id uuid references public.customers(id),
  status public.order_status not null default 'pending_payment',
  payment_status public.payment_status not null default 'pending',
  currency text not null default 'SAR',
  subtotal numeric(12,2) not null default 0,
  discount_total numeric(12,2) not null default 0,
  shipping_total numeric(12,2) not null default 0,
  supplier_cost_total numeric(12,2) not null default 0,
  payment_fee numeric(12,2) not null default 0,
  other_cost_total numeric(12,2) not null default 0,
  total numeric(12,2) not null default 0,
  profit numeric(12,2) not null default 0,
  customer_snapshot jsonb not null default '{}'::jsonb,
  shipping_snapshot jsonb not null default '{}'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  sku text,
  quantity integer not null default 1,
  unit_price numeric(12,2) not null default 0,
  unit_cost numeric(12,2) not null default 0,
  line_total numeric(12,2) generated always as (quantity * unit_price) stored,
  line_cost numeric(12,2) generated always as (quantity * unit_cost) stored
);

create table if not exists public.order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  old_status public.order_status,
  new_status public.order_status not null,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.customer_events (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id),
  session_id text not null,
  event_type public.event_type not null,
  product_id uuid references public.products(id),
  search_term text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  name_ar text not null,
  description_ar text,
  discount_percent numeric(7,2),
  fixed_discount numeric(12,2),
  start_at timestamptz not null,
  end_at timestamptz not null,
  active boolean not null default true,
  product_ids uuid[] not null default '{}',
  category_slugs text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.import_jobs (
  id uuid primary key default gen_random_uuid(),
  source_url text not null,
  source_platform text,
  status text not null default 'queued',
  extracted_data jsonb not null default '{}'::jsonb,
  error_message text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  description text,
  amount numeric(12,2) not null,
  occurred_at timestamptz not null default now()
);

create index if not exists idx_products_category on public.products(category);
create index if not exists idx_products_status on public.products(status);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created_at on public.orders(created_at);
create index if not exists idx_events_session on public.customer_events(session_id);
create index if not exists idx_events_product on public.customer_events(product_id);

create or replace function public.calc_order_profit(p_order_id uuid)
returns numeric language sql stable as $$
  select coalesce(o.total,0) - coalesce(o.supplier_cost_total,0) - coalesce(o.shipping_total,0) - coalesce(o.payment_fee,0) - coalesce(o.other_cost_total,0)
  from public.orders o where o.id=p_order_id;
$$;

create or replace view public.accounting_daily as
select date_trunc('day',created_at)::date as day,
       sum(total) filter(where payment_status='paid') as paid_revenue,
       sum(supplier_cost_total) filter(where payment_status='paid') as product_cost,
       sum(shipping_total) filter(where payment_status='paid') as shipping_cost,
       sum(payment_fee) filter(where payment_status='paid') as payment_fees,
       sum(other_cost_total) filter(where payment_status='paid') as other_costs,
       sum(profit) filter(where payment_status='paid') as gross_profit
from public.orders group by 1 order by 1 desc;

insert into public.store_settings default values on conflict do nothing;
insert into public.categories(slug,name_ar,name_en,sort_order) values
('jewelry','الفضة والمجوهرات','Jewelry',1),('perfumes','العطور','Perfumes',2),('watches','الساعات','Watches',3),('sunglasses','النظارات الشمسية','Sunglasses',4)
on conflict(slug) do nothing;

-- Enable RLS. The exact admin policies should be tightened after creating your admin role.
alter table public.store_settings enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_status_history enable row level security;
alter table public.customer_events enable row level security;
alter table public.offers enable row level security;
alter table public.import_jobs enable row level security;
alter table public.expenses enable row level security;

-- Public catalog policies.
drop policy if exists public_read_active_products on public.products;
create policy public_read_active_products on public.products for select using (status='active');
drop policy if exists public_read_categories on public.categories;
create policy public_read_categories on public.categories for select using (active=true);
drop policy if exists public_read_active_offers on public.offers;
create policy public_read_active_offers on public.offers for select using (active=true and now() between start_at and end_at);

-- Customer event insert is intentionally narrow; admin writes should use authenticated Edge Functions.
drop policy if exists public_insert_customer_events on public.customer_events;
create policy public_insert_customer_events on public.customer_events for insert with check (length(session_id)>0);

-- IMPORTANT: do not expose service_role keys in the browser. Use Supabase Auth + server-side/Edge Functions for admin mutations.
