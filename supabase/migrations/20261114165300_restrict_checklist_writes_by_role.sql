create or replace function public.can_edit_board(target_board_id uuid)
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
  ) or exists (
    select 1
    from public.board_members bm
    where bm.board_id = target_board_id
      and bm.user_id = (select auth.uid())
      and bm.role in ('OWNER'::public.board_role, 'EDITOR'::public.board_role)
  );
$$;

revoke all on function public.can_edit_board(uuid) from public, anon, authenticated;
grant execute on function public.can_edit_board(uuid) to authenticated;

drop policy if exists "Checklist items visible to board members" on public.task_checklist_items;
drop policy if exists "Checklist items viewable by board members" on public.task_checklist_items;
drop policy if exists "Editors can insert checklist items" on public.task_checklist_items;
drop policy if exists "Editors can update checklist items" on public.task_checklist_items;
drop policy if exists "Editors can delete checklist items" on public.task_checklist_items;

create policy "Checklist items viewable by board members"
  on public.task_checklist_items for select to authenticated
  using (
    exists (
      select 1 from public.tasks t
      where t.id = task_checklist_items.task_id
        and (public.is_board_owner(t.board_id) or public.is_board_member(t.board_id))
    )
  );

create policy "Editors can insert checklist items"
  on public.task_checklist_items for insert to authenticated
  with check (
    exists (
      select 1 from public.tasks t
      where t.id = task_checklist_items.task_id
        and public.can_edit_board(t.board_id)
    )
  );

create policy "Editors can update checklist items"
  on public.task_checklist_items for update to authenticated
  using (
    exists (
      select 1 from public.tasks t
      where t.id = task_checklist_items.task_id
        and public.can_edit_board(t.board_id)
    )
  )
  with check (
    exists (
      select 1 from public.tasks t
      where t.id = task_checklist_items.task_id
        and public.can_edit_board(t.board_id)
    )
  );

create policy "Editors can delete checklist items"
  on public.task_checklist_items for delete to authenticated
  using (
    exists (
      select 1 from public.tasks t
      where t.id = task_checklist_items.task_id
        and public.can_edit_board(t.board_id)
    )
  );
