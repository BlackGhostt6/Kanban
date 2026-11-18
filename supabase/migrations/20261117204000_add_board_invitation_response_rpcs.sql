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

revoke all on function public.accept_board_invitation(uuid) from public, anon, authenticated;
grant execute on function public.accept_board_invitation(uuid) to authenticated;
revoke all on function public.decline_board_invitation(uuid) from public, anon, authenticated;
grant execute on function public.decline_board_invitation(uuid) to authenticated;

notify pgrst, 'reload schema';
