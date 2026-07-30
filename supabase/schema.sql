-- Nexo3D — tabela de pedidos
-- Correr no SQL Editor do projeto Supabase

create table if not exists orders (
  id            uuid primary key default gen_random_uuid(),

  -- Cliente
  customer_name  text not null,
  customer_email text not null,
  customer_phone text not null,
  address        text not null,
  city           text not null,
  postal_code    text not null,
  country        text not null default 'Portugal',
  nif            text,
  notes          text,

  -- Produtos (array de itens serializados)
  items          jsonb not null default '[]',

  -- Valores
  subtotal       numeric(10,2) not null,
  shipping_cost  numeric(10,2) not null default 0,
  shipping_method text not null,
  total          numeric(10,2) not null,

  -- Estado e pagamento
  status         text not null default 'novo'
                   check (status in ('novo','confirmado','em_producao','enviado','concluido','cancelado')),
  payment_method text,
  payment_ref    text,

  -- Timestamps
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Índices úteis
create index if not exists orders_status_idx      on orders (status);
create index if not exists orders_created_at_idx  on orders (created_at desc);
create index if not exists orders_customer_email_idx on orders (customer_email);

-- Trigger para atualizar updated_at automaticamente
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace trigger orders_updated_at
  before update on orders
  for each row execute function set_updated_at();

-- Row Level Security
alter table orders enable row level security;

-- Qualquer pessoa pode criar um pedido (checkout público)
create policy "insert_order" on orders
  for insert with check (true);

-- Apenas leituras autenticadas — por agora liberamos para o service role
-- (substituir por auth quando adicionar login real ao admin)
create policy "read_orders" on orders
  for select using (true);

create policy "update_orders" on orders
  for update using (true);

create policy "delete_orders" on orders
  for delete using (true);
