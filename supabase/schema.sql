create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  name text not null check (char_length(name) between 2 and 80),
  username text not null check (username ~ '^[a-z0-9._-]{3,30}$'),
  created_at timestamptz not null default now()
);

create unique index if not exists profiles_username_lower_idx
  on public.profiles (lower(username));

create table if not exists public.boards (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 80),
  description text not null default '' check (char_length(description) <= 500),
  created_at timestamptz not null default now()
);

create index if not exists boards_owner_id_idx
  on public.boards (owner_id, created_at desc);

do $$
begin
  create type public.board_role as enum ('OWNER', 'EDITOR', 'VIEWER');
exception
  when duplicate_object then null;
end;
$$;

create table if not exists public.board_members (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards (id) on delete cascade,
  user_id uuid references auth.users (id) on delete cascade,
  email text not null,
  role public.board_role not null default 'VIEWER',
  invited_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  unique (board_id, user_id),
  unique (board_id, email)
);

create index if not exists board_members_user_id_idx
  on public.board_members (user_id, board_id);

create table if not exists public.board_columns (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards (id) on delete cascade,
  key text not null,
  name text not null,
  sort_order integer not null default 0,
  wip_limit integer,
  created_at timestamptz not null default now(),
  unique (board_id, key),
  unique (board_id, sort_order)
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 1 and 120),
  description text not null default '' check (char_length(description) <= 1200),
  status text not null default 'todo' check (char_length(status) between 1 and 40),
  due_date date,
  priority text not null default 'media' check (priority in ('baixa', 'media', 'alta')),
  assignee_id uuid references auth.users (id) on delete set null,
  story_points integer check (story_points between 0 and 100),
  sprint_id uuid,
  backlog boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.task_comments (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  content text not null check (char_length(btrim(content)) between 1 and 5000),
  created_at timestamptz not null default now()
);

create index if not exists task_comments_task_created_idx
  on public.task_comments (task_id, created_at asc);

create table if not exists public.task_checklist_items (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks (id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 1 and 200),
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists task_checklist_task_idx
  on public.task_checklist_items (task_id, created_at asc);

create table if not exists public.task_labels (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks (id) on delete cascade,
  label text not null check (label in ('Bug', 'Feature', 'Urgente')),
  created_at timestamptz not null default now(),
  unique (task_id, label)
);

create table if not exists public.task_activities (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards (id) on delete cascade,
  task_id uuid references public.tasks (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  action text not null,
  description text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.sprints (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards (id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 80),
  start_date date not null,
  end_date date not null,
  created_by uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  check (end_date >= start_date)
);

create index if not exists sprints_board_idx
  on public.sprints (board_id, start_date desc);

create table if not exists public.acceptance_criteria (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks (id) on delete cascade,
  description text not null check (char_length(btrim(description)) between 1 and 500),
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.definition_of_done (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks (id) on delete cascade,
  description text not null check (char_length(btrim(description)) between 1 and 500),
  done boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles add column if not exists email text;

update public.profiles p
set email = lower(btrim(u.email))
from auth.users u
where u.id = p.id and p.email is null and u.email is not null;

do $$
begin
  if exists (select 1 from public.profiles where email is null) then
    raise exception 'Não foi possível migrar perfis sem e-mail em auth.users.';
  end if;
end;
$$;

alter table public.profiles alter column email set not null;
create unique index if not exists profiles_email_lower_idx
  on public.profiles (lower(email));

alter table public.tasks add column if not exists board_id uuid references public.boards (id) on delete cascade;
alter table public.tasks add column if not exists due_date date;
alter table public.tasks add column if not exists priority text not null default 'media';
alter table public.tasks add column if not exists assignee_id uuid references auth.users (id) on delete set null;
alter table public.tasks add column if not exists story_points integer;
alter table public.tasks add column if not exists sprint_id uuid;
alter table public.tasks add column if not exists backlog boolean not null default false;
alter table public.tasks add column if not exists updated_at timestamptz not null default now();

insert into public.boards (owner_id, name, description)
select distinct t.user_id, 'Meu quadro', 'Quadro principal'
from public.tasks t
where t.board_id is null
  and t.user_id is not null
  and not exists (
    select 1 from public.boards b where b.owner_id = t.user_id
  );

insert into public.board_columns (board_id, key, name, sort_order)
select b.id, c.key, c.name, c.sort_order
from public.boards b
cross join (values
  ('todo', 'A Fazer', 1),
  ('progress', 'Em Andamento', 2),
  ('done', 'Concluído', 3)
) as c(key, name, sort_order)
on conflict (board_id, key) do nothing;

update public.tasks t
set board_id = (
  select b.id
  from public.boards b
  where b.owner_id = t.user_id
  order by b.created_at asc, b.id asc
  limit 1
)
where t.board_id is null;

do $$
begin
  if exists (select 1 from public.tasks where board_id is null) then
    raise exception 'Não foi possível associar algumas tarefas antigas a um quadro.';
  end if;
end;
$$;

alter table public.tasks alter column board_id set not null;
create index if not exists tasks_board_status_idx
  on public.tasks (board_id, status, created_at desc);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'tasks_sprint_id_fkey'
      and conrelid = 'public.tasks'::regclass
  ) then
    alter table public.tasks
      add constraint tasks_sprint_id_fkey
      foreign key (sprint_id) references public.sprints (id) on delete set null;
  end if;
end;
$$;

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, name, username)
  values (
    new.id,
    lower(btrim(coalesce(new.email, ''))),
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

-- These privileged checks avoid recursive RLS evaluation across boards and memberships.
create or replace function public.is_board_owner(target_board_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.boards b
    where b.id = target_board_id
      and b.owner_id = (select auth.uid())
  );
$$;

create or replace function public.is_board_member(target_board_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.board_members bm
    where bm.board_id = target_board_id
      and bm.user_id = (select auth.uid())
  );
$$;

create or replace function public.get_pending_board_invitations()
returns table (
  membership_id uuid,
  board_id uuid,
  board_name text,
  inviter_name text,
  role public.board_role,
  invited_at timestamptz
)
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  current_email text;
begin
  select lower(btrim(u.email))
    into current_email
    from auth.users u
    where u.id = (select auth.uid());

  if current_email is null then
    raise exception 'Não foi possível identificar o e-mail da sessão.';
  end if;

  return query
    select bm.id, b.id, b.name,
      coalesce(nullif(p.name, ''), inviter.email, 'Usuário do Dayboard'),
      bm.role, bm.created_at
    from public.board_members bm
    join public.boards b on b.id = bm.board_id
    left join auth.users inviter on inviter.id = bm.invited_by
    left join public.profiles p on p.id = bm.invited_by
    where bm.user_id is null
      and lower(btrim(bm.email)) = current_email
    order by bm.created_at desc;
end;
$$;

create or replace function public.accept_board_invitation(target_membership_id uuid)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_email text;
  accepted_board_id uuid;
  actor_name text;
  board_name text;
begin
  select lower(btrim(u.email))
    into current_email
    from auth.users u
    where u.id = (select auth.uid());

  if current_email is null then
    raise exception 'Não foi possível identificar o e-mail da sessão.';
  end if;

  update public.board_members bm
    set user_id = (select auth.uid())
    where bm.id = target_membership_id
      and bm.user_id is null
      and lower(btrim(bm.email)) = current_email
    returning bm.board_id into accepted_board_id;

  if accepted_board_id is null then
    raise exception 'O convite não existe ou não pertence à sua conta.';
  end if;

  select b.name into board_name
    from public.boards b
    where b.id = accepted_board_id;
  select coalesce(nullif(p.name, ''), u.email, 'Um usuário')
    into actor_name
    from auth.users u
    left join public.profiles p on p.id = u.id
    where u.id = (select auth.uid());

  insert into public.task_activities (board_id, user_id, action, description)
    values (
      accepted_board_id,
      (select auth.uid()),
      'invitation_accepted',
      coalesce(actor_name, 'Um usuário') || ' aceitou o convite para participar do quadro “' || coalesce(board_name, 'quadro') || '”.'
    );

  return accepted_board_id;
end;
$$;

create or replace function public.decline_board_invitation(target_membership_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_email text;
  declined_board_id uuid;
  actor_name text;
  board_name text;
begin
  select lower(btrim(u.email))
    into current_email
    from auth.users u
    where u.id = (select auth.uid());

  if current_email is null then
    raise exception 'Não foi possível identificar o e-mail da sessão.';
  end if;

  delete from public.board_members bm
    where bm.id = target_membership_id
      and bm.user_id is null
      and lower(btrim(bm.email)) = current_email
    returning bm.board_id into declined_board_id;

  if declined_board_id is null then
    raise exception 'O convite não existe ou não pertence à sua conta.';
  end if;

  select b.name into board_name
    from public.boards b
    where b.id = declined_board_id;
  select coalesce(nullif(p.name, ''), u.email, 'Um usuário')
    into actor_name
    from auth.users u
    left join public.profiles p on p.id = u.id
    where u.id = (select auth.uid());

  insert into public.task_activities (board_id, user_id, action, description)
    values (
      declined_board_id,
      (select auth.uid()),
      'invitation_declined',
      coalesce(actor_name, 'Um usuário') || ' recusou o convite para participar do quadro “' || coalesce(board_name, 'quadro') || '”.'
    );
end;
$$;

create or replace function public.is_username_available(candidate text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select not exists (
    select 1
    from public.profiles
    where lower(username) = lower(btrim(candidate))
  );
$$;

revoke all on function public.is_username_available(text) from public;
grant execute on function public.is_username_available(text) to anon, authenticated;
revoke all on function public.is_board_owner(uuid) from public, anon, authenticated;
grant execute on function public.is_board_owner(uuid) to authenticated;
revoke all on function public.is_board_member(uuid) from public, anon, authenticated;
grant execute on function public.is_board_member(uuid) to authenticated;
revoke all on function public.get_pending_board_invitations() from public, anon, authenticated;
grant execute on function public.get_pending_board_invitations() to authenticated;
revoke all on function public.accept_board_invitation(uuid) from public, anon, authenticated;
grant execute on function public.accept_board_invitation(uuid) to authenticated;
revoke all on function public.decline_board_invitation(uuid) from public, anon, authenticated;
grant execute on function public.decline_board_invitation(uuid) to authenticated;

alter table public.profiles enable row level security;
alter table public.boards enable row level security;
alter table public.board_members enable row level security;
alter table public.board_columns enable row level security;
alter table public.tasks enable row level security;
alter table public.task_comments enable row level security;
alter table public.task_checklist_items enable row level security;
alter table public.task_labels enable row level security;
alter table public.task_activities enable row level security;
alter table public.sprints enable row level security;
alter table public.acceptance_criteria enable row level security;
alter table public.definition_of_done enable row level security;

revoke all on table public.profiles, public.boards, public.board_members, public.board_columns, public.tasks, public.task_comments, public.task_checklist_items, public.task_labels, public.task_activities, public.sprints, public.acceptance_criteria, public.definition_of_done from public, anon, authenticated;

grant select, update on table public.profiles to authenticated;
grant select, insert, update, delete on table public.boards to authenticated;
grant select, insert, update, delete on table public.board_members to authenticated;
grant select, insert, update, delete on table public.board_columns to authenticated;
grant select, insert, update, delete on table public.tasks to authenticated;
grant select, insert, update, delete on table public.task_comments to authenticated;
grant select, insert, update, delete on table public.task_checklist_items to authenticated;
grant select, insert, update, delete on table public.task_labels to authenticated;
grant select, insert, update, delete on table public.task_activities to authenticated;
grant select, insert, update, delete on table public.sprints to authenticated;
grant select, insert, update, delete on table public.acceptance_criteria to authenticated;
grant select, insert, update, delete on table public.definition_of_done to authenticated;

drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select to authenticated
  using ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists "Users can manage their boards" on public.boards;
create policy "Users can manage their boards"
  on public.boards for all to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists "Members can view shared boards" on public.boards;
create policy "Members can view shared boards"
  on public.boards for select to authenticated
  using (public.is_board_member(id));

drop policy if exists "Board members can manage membership" on public.board_members;
drop policy if exists "Board owners can manage membership" on public.board_members;
create policy "Board owners can manage membership"
  on public.board_members for all to authenticated
  using (public.is_board_owner(board_id))
  with check (public.is_board_owner(board_id));

drop policy if exists "Users can view their own board membership" on public.board_members;
create policy "Users can view their own board membership"
  on public.board_members for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Board columns are viewable by members" on public.board_columns;
create policy "Board columns are viewable by members"
  on public.board_columns for all to authenticated
  using (
    exists (
      select 1 from public.boards b
      where b.id = board_columns.board_id
        and (
          b.owner_id = (select auth.uid())
          or exists (
            select 1 from public.board_members bm
            where bm.board_id = b.id and bm.user_id = (select auth.uid())
          )
        )
    )
  )
  with check (
    exists (
      select 1 from public.boards b
      where b.id = board_columns.board_id
        and (
          b.owner_id = (select auth.uid())
          or exists (
            select 1 from public.board_members bm
            where bm.board_id = b.id and bm.user_id = (select auth.uid())
          )
        )
    )
  );

drop policy if exists "Tasks are shared with board members" on public.tasks;
create policy "Tasks are shared with board members"
  on public.tasks for all to authenticated
  using (
    board_id in (
      select b.id from public.boards b
      where b.owner_id = (select auth.uid())
      or exists (
        select 1 from public.board_members bm
        where bm.board_id = b.id and bm.user_id = (select auth.uid())
      )
    )
  )
  with check (
    board_id in (
      select b.id from public.boards b
      where b.owner_id = (select auth.uid())
      or exists (
        select 1 from public.board_members bm
        where bm.board_id = b.id and bm.user_id = (select auth.uid())
      )
    )
  );

drop policy if exists "Comments visible to board members" on public.task_comments;
create policy "Comments visible to board members"
  on public.task_comments for all to authenticated
  using (
    exists (
      select 1 from public.tasks t
      join public.boards b on b.id = t.board_id
      where t.id = task_comments.task_id
        and (
          b.owner_id = (select auth.uid())
          or exists (
            select 1 from public.board_members bm
            where bm.board_id = b.id and bm.user_id = (select auth.uid())
          )
        )
    )
  )
  with check (
    exists (
      select 1 from public.tasks t
      join public.boards b on b.id = t.board_id
      where t.id = task_comments.task_id
        and (
          b.owner_id = (select auth.uid())
          or exists (
            select 1 from public.board_members bm
            where bm.board_id = b.id and bm.user_id = (select auth.uid())
          )
        )
    )
  );

drop policy if exists "Checklist items visible to board members" on public.task_checklist_items;
create policy "Checklist items visible to board members"
  on public.task_checklist_items for all to authenticated
  using (
    exists (
      select 1 from public.tasks t
      join public.boards b on b.id = t.board_id
      where t.id = task_checklist_items.task_id
        and (
          b.owner_id = (select auth.uid())
          or exists (
            select 1 from public.board_members bm where bm.board_id = b.id and bm.user_id = (select auth.uid())
          )
        )
    )
  )
  with check (
    exists (
      select 1 from public.tasks t
      join public.boards b on b.id = t.board_id
      where t.id = task_checklist_items.task_id
        and (
          b.owner_id = (select auth.uid())
          or exists (
            select 1 from public.board_members bm where bm.board_id = b.id and bm.user_id = (select auth.uid())
          )
        )
    )
  );

drop policy if exists "Labels visible to board members" on public.task_labels;
create policy "Labels visible to board members"
  on public.task_labels for all to authenticated
  using (
    exists (
      select 1 from public.tasks t
      join public.boards b on b.id = t.board_id
      where t.id = task_labels.task_id
        and (
          b.owner_id = (select auth.uid())
          or exists (
            select 1 from public.board_members bm where bm.board_id = b.id and bm.user_id = (select auth.uid())
          )
        )
    )
  )
  with check (
    exists (
      select 1 from public.tasks t
      join public.boards b on b.id = t.board_id
      where t.id = task_labels.task_id
        and (
          b.owner_id = (select auth.uid())
          or exists (
            select 1 from public.board_members bm where bm.board_id = b.id and bm.user_id = (select auth.uid())
          )
        )
    )
  );

drop policy if exists "Activities visible to board members" on public.task_activities;
create policy "Activities visible to board members"
  on public.task_activities for all to authenticated
  using (
    board_id in (
      select b.id from public.boards b
      where b.owner_id = (select auth.uid())
      or exists (
        select 1 from public.board_members bm where bm.board_id = b.id and bm.user_id = (select auth.uid())
      )
    )
  )
  with check (
    board_id in (
      select b.id from public.boards b
      where b.owner_id = (select auth.uid())
      or exists (
        select 1 from public.board_members bm where bm.board_id = b.id and bm.user_id = (select auth.uid())
      )
    )
  );

drop policy if exists "Sprints visible to board members" on public.sprints;
create policy "Sprints visible to board members"
  on public.sprints for all to authenticated
  using (
    board_id in (
      select b.id from public.boards b
      where b.owner_id = (select auth.uid())
      or exists (
        select 1 from public.board_members bm where bm.board_id = b.id and bm.user_id = (select auth.uid())
      )
    )
  )
  with check (
    board_id in (
      select b.id from public.boards b
      where b.owner_id = (select auth.uid())
      or exists (
        select 1 from public.board_members bm where bm.board_id = b.id and bm.user_id = (select auth.uid())
      )
    )
  );

drop policy if exists "Acceptance criteria visible to board members" on public.acceptance_criteria;
create policy "Acceptance criteria visible to board members"
  on public.acceptance_criteria for all to authenticated
  using (
    exists (
      select 1 from public.tasks t
      join public.boards b on b.id = t.board_id
      where t.id = acceptance_criteria.task_id
        and (
          b.owner_id = (select auth.uid())
          or exists (
            select 1 from public.board_members bm where bm.board_id = b.id and bm.user_id = (select auth.uid())
          )
        )
    )
  )
  with check (
    exists (
      select 1 from public.tasks t
      join public.boards b on b.id = t.board_id
      where t.id = acceptance_criteria.task_id
        and (
          b.owner_id = (select auth.uid())
          or exists (
            select 1 from public.board_members bm where bm.board_id = b.id and bm.user_id = (select auth.uid())
          )
        )
    )
  );

drop policy if exists "DoD visible to board members" on public.definition_of_done;
create policy "DoD visible to board members"
  on public.definition_of_done for all to authenticated
  using (
    exists (
      select 1 from public.tasks t
      join public.boards b on b.id = t.board_id
      where t.id = definition_of_done.task_id
        and (
          b.owner_id = (select auth.uid())
          or exists (
            select 1 from public.board_members bm where bm.board_id = b.id and bm.user_id = (select auth.uid())
          )
        )
    )
  )
  with check (
    exists (
      select 1 from public.tasks t
      join public.boards b on b.id = t.board_id
      where t.id = definition_of_done.task_id
        and (
          b.owner_id = (select auth.uid())
          or exists (
            select 1 from public.board_members bm where bm.board_id = b.id and bm.user_id = (select auth.uid())
          )
        )
    )
  );
