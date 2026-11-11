create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 2 and 80),
  username text not null check (username ~ '^[a-z0-9._-]{3,30}$'),
  created_at timestamptz not null default now()
);

create unique index if not exists profiles_username_lower_idx
  on public.profiles (lower(username));

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 1 and 120),
  description text not null default '' check (char_length(description) <= 600),
  status text not null default 'todo' check (status in ('todo', 'progress', 'done')),
  created_at timestamptz not null default now()
);

create index if not exists tasks_user_id_created_at_idx
  on public.tasks (user_id, created_at desc);

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name, username)
  values (
    new.id,
    btrim(coalesce(new.raw_user_meta_data ->> 'name', '')),
    lower(btrim(coalesce(new.raw_user_meta_data ->> 'username', '')))
  );
  return new;
end;
$$;

drop trigger if exists create_profile_after_signup on auth.users;
create trigger create_profile_after_signup
  after insert on auth.users
  for each row execute function public.create_profile_for_new_user();

alter table public.profiles enable row level security;
alter table public.tasks enable row level security;

revoke all on table public.profiles, public.tasks from public, anon, authenticated;
grant select, update on table public.profiles to authenticated;
grant select, insert, update, delete on table public.tasks to authenticated;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Users can view their own tasks" on public.tasks;
create policy "Users can view their own tasks"
  on public.tasks for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can create their own tasks" on public.tasks;
create policy "Users can create their own tasks"
  on public.tasks for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own tasks" on public.tasks;
create policy "Users can update their own tasks"
  on public.tasks for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own tasks" on public.tasks;
create policy "Users can delete their own tasks"
  on public.tasks for delete to authenticated
  using ((select auth.uid()) = user_id);
