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
  ) or exists (
    select 1
    from public.board_members bm
    where bm.board_id = target_board_id
      and bm.user_id = (select auth.uid())
      and bm.role = 'OWNER'::public.board_role
  );
$$;

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

revoke all on function public.is_board_owner(uuid) from public, anon, authenticated;
grant execute on function public.is_board_owner(uuid) to authenticated;
revoke all on function public.can_edit_board(uuid) from public, anon, authenticated;
grant execute on function public.can_edit_board(uuid) to authenticated;

drop policy if exists "Board columns are viewable by members" on public.board_columns;
drop policy if exists "Board columns viewable by members" on public.board_columns;
drop policy if exists "Editors can insert board columns" on public.board_columns;
drop policy if exists "Editors can update board columns" on public.board_columns;
drop policy if exists "Editors can delete board columns" on public.board_columns;
create policy "Board columns viewable by members"
  on public.board_columns for select to authenticated
  using (public.is_board_owner(board_id) or public.is_board_member(board_id));
create policy "Editors can insert board columns"
  on public.board_columns for insert to authenticated
  with check (public.can_edit_board(board_id));
create policy "Editors can update board columns"
  on public.board_columns for update to authenticated
  using (public.can_edit_board(board_id))
  with check (public.can_edit_board(board_id));
create policy "Editors can delete board columns"
  on public.board_columns for delete to authenticated
  using (public.can_edit_board(board_id));

drop policy if exists "Tasks are shared with board members" on public.tasks;
drop policy if exists "Tasks viewable by board members" on public.tasks;
drop policy if exists "Editors can insert tasks" on public.tasks;
drop policy if exists "Editors can update tasks" on public.tasks;
drop policy if exists "Editors can delete tasks" on public.tasks;
create policy "Tasks viewable by board members"
  on public.tasks for select to authenticated
  using (public.is_board_owner(board_id) or public.is_board_member(board_id));
create policy "Editors can insert tasks"
  on public.tasks for insert to authenticated
  with check (public.can_edit_board(board_id));
create policy "Editors can update tasks"
  on public.tasks for update to authenticated
  using (public.can_edit_board(board_id))
  with check (public.can_edit_board(board_id));
create policy "Editors can delete tasks"
  on public.tasks for delete to authenticated
  using (public.can_edit_board(board_id));

drop policy if exists "Comments visible to board members" on public.task_comments;
drop policy if exists "Comments viewable by board members" on public.task_comments;
drop policy if exists "Editors can insert task comments" on public.task_comments;
drop policy if exists "Editors can update task comments" on public.task_comments;
drop policy if exists "Editors can delete task comments" on public.task_comments;
create policy "Comments viewable by board members"
  on public.task_comments for select to authenticated
  using (
    exists (
      select 1 from public.tasks t
      where t.id = task_comments.task_id
        and (public.is_board_owner(t.board_id) or public.is_board_member(t.board_id))
    )
  );
create policy "Editors can insert task comments"
  on public.task_comments for insert to authenticated
  with check (
    exists (
      select 1 from public.tasks t
      where t.id = task_comments.task_id
        and public.can_edit_board(t.board_id)
    )
  );
create policy "Editors can update task comments"
  on public.task_comments for update to authenticated
  using (
    exists (
      select 1 from public.tasks t
      where t.id = task_comments.task_id
        and public.can_edit_board(t.board_id)
    )
  )
  with check (
    exists (
      select 1 from public.tasks t
      where t.id = task_comments.task_id
        and public.can_edit_board(t.board_id)
    )
  );
create policy "Editors can delete task comments"
  on public.task_comments for delete to authenticated
  using (
    exists (
      select 1 from public.tasks t
      where t.id = task_comments.task_id
        and public.can_edit_board(t.board_id)
    )
  );

drop policy if exists "Labels visible to board members" on public.task_labels;
drop policy if exists "Labels viewable by board members" on public.task_labels;
drop policy if exists "Editors can insert task labels" on public.task_labels;
drop policy if exists "Editors can update task labels" on public.task_labels;
drop policy if exists "Editors can delete task labels" on public.task_labels;
create policy "Labels viewable by board members"
  on public.task_labels for select to authenticated
  using (
    exists (
      select 1 from public.tasks t
      where t.id = task_labels.task_id
        and (public.is_board_owner(t.board_id) or public.is_board_member(t.board_id))
    )
  );
create policy "Editors can insert task labels"
  on public.task_labels for insert to authenticated
  with check (
    exists (
      select 1 from public.tasks t
      where t.id = task_labels.task_id
        and public.can_edit_board(t.board_id)
    )
  );
create policy "Editors can update task labels"
  on public.task_labels for update to authenticated
  using (
    exists (
      select 1 from public.tasks t
      where t.id = task_labels.task_id
        and public.can_edit_board(t.board_id)
    )
  )
  with check (
    exists (
      select 1 from public.tasks t
      where t.id = task_labels.task_id
        and public.can_edit_board(t.board_id)
    )
  );
create policy "Editors can delete task labels"
  on public.task_labels for delete to authenticated
  using (
    exists (
      select 1 from public.tasks t
      where t.id = task_labels.task_id
        and public.can_edit_board(t.board_id)
    )
  );

drop policy if exists "Activities visible to board members" on public.task_activities;
drop policy if exists "Activities viewable by board members" on public.task_activities;
drop policy if exists "Editors can insert task activities" on public.task_activities;
create policy "Activities viewable by board members"
  on public.task_activities for select to authenticated
  using (public.is_board_owner(board_id) or public.is_board_member(board_id));
create policy "Editors can insert task activities"
  on public.task_activities for insert to authenticated
  with check (public.can_edit_board(board_id));

drop policy if exists "Sprints visible to board members" on public.sprints;
drop policy if exists "Sprints viewable by board members" on public.sprints;
drop policy if exists "Editors can insert sprints" on public.sprints;
drop policy if exists "Editors can update sprints" on public.sprints;
drop policy if exists "Editors can delete sprints" on public.sprints;
create policy "Sprints viewable by board members"
  on public.sprints for select to authenticated
  using (public.is_board_owner(board_id) or public.is_board_member(board_id));
create policy "Editors can insert sprints"
  on public.sprints for insert to authenticated
  with check (public.can_edit_board(board_id));
create policy "Editors can update sprints"
  on public.sprints for update to authenticated
  using (public.can_edit_board(board_id))
  with check (public.can_edit_board(board_id));
create policy "Editors can delete sprints"
  on public.sprints for delete to authenticated
  using (public.can_edit_board(board_id));

drop policy if exists "Acceptance criteria visible to board members" on public.acceptance_criteria;
drop policy if exists "Acceptance criteria viewable by board members" on public.acceptance_criteria;
drop policy if exists "Editors can insert acceptance criteria" on public.acceptance_criteria;
drop policy if exists "Editors can update acceptance criteria" on public.acceptance_criteria;
drop policy if exists "Editors can delete acceptance criteria" on public.acceptance_criteria;
create policy "Acceptance criteria viewable by board members"
  on public.acceptance_criteria for select to authenticated
  using (
    exists (
      select 1 from public.tasks t
      where t.id = acceptance_criteria.task_id
        and (public.is_board_owner(t.board_id) or public.is_board_member(t.board_id))
    )
  );
create policy "Editors can insert acceptance criteria"
  on public.acceptance_criteria for insert to authenticated
  with check (
    exists (
      select 1 from public.tasks t
      where t.id = acceptance_criteria.task_id
        and public.can_edit_board(t.board_id)
    )
  );
create policy "Editors can update acceptance criteria"
  on public.acceptance_criteria for update to authenticated
  using (
    exists (
      select 1 from public.tasks t
      where t.id = acceptance_criteria.task_id
        and public.can_edit_board(t.board_id)
    )
  )
  with check (
    exists (
      select 1 from public.tasks t
      where t.id = acceptance_criteria.task_id
        and public.can_edit_board(t.board_id)
    )
  );
create policy "Editors can delete acceptance criteria"
  on public.acceptance_criteria for delete to authenticated
  using (
    exists (
      select 1 from public.tasks t
      where t.id = acceptance_criteria.task_id
        and public.can_edit_board(t.board_id)
    )
  );

drop policy if exists "DoD visible to board members" on public.definition_of_done;
drop policy if exists "DoD viewable by board members" on public.definition_of_done;
drop policy if exists "Editors can insert definition of done" on public.definition_of_done;
drop policy if exists "Editors can update definition of done" on public.definition_of_done;
drop policy if exists "Editors can delete definition of done" on public.definition_of_done;
create policy "DoD viewable by board members"
  on public.definition_of_done for select to authenticated
  using (
    exists (
      select 1 from public.tasks t
      where t.id = definition_of_done.task_id
        and (public.is_board_owner(t.board_id) or public.is_board_member(t.board_id))
    )
  );
create policy "Editors can insert definition of done"
  on public.definition_of_done for insert to authenticated
  with check (
    exists (
      select 1 from public.tasks t
      where t.id = definition_of_done.task_id
        and public.can_edit_board(t.board_id)
    )
  );
create policy "Editors can update definition of done"
  on public.definition_of_done for update to authenticated
  using (
    exists (
      select 1 from public.tasks t
      where t.id = definition_of_done.task_id
        and public.can_edit_board(t.board_id)
    )
  )
  with check (
    exists (
      select 1 from public.tasks t
      where t.id = definition_of_done.task_id
        and public.can_edit_board(t.board_id)
    )
  );
create policy "Editors can delete definition of done"
  on public.definition_of_done for delete to authenticated
  using (
    exists (
      select 1 from public.tasks t
      where t.id = definition_of_done.task_id
        and public.can_edit_board(t.board_id)
    )
  );

notify pgrst, 'reload schema';
