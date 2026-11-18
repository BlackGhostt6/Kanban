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

revoke all on function public.get_pending_board_invitations() from public, anon, authenticated;
grant execute on function public.get_pending_board_invitations() to authenticated;

notify pgrst, 'reload schema';
