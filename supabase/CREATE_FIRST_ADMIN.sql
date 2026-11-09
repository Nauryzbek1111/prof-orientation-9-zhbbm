-- 1) Supabase Dashboard → Authentication → Users бөлімінде администраторды алдын ала жасаңыз.
-- 2) Төмендегі email мәнін сол аккаунттың нақты email мекенжайына ауыстырыңыз.
-- 3) SQL Editor ішінде орындаңыз. Құпиясөзді бұл SQL-ге жазбаңыз.

insert into public.profiles (id, full_name, role, is_active)
select id, 'Мектеп әкімшісі', 'admin'::public.app_role, true
from auth.users
where email = 'admin@school.kz'
on conflict (id) do update
set role = 'admin'::public.app_role,
    is_active = true;

-- Тексеру: бір жол және role = admin болуы керек.
select p.id, u.email, p.full_name, p.role, p.is_active
from public.profiles p
join auth.users u on u.id = p.id
where u.email = 'admin@school.kz';
