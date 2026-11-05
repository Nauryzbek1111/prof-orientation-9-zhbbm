-- PROF ORIENTATION / №9 ЖББМ
-- Бастапқы дерекқор схемасы. Өндірістік іске қосу алдында RLS саясатын тексеру қажет.
create extension if not exists pgcrypto;

do $$ begin
  create type public.app_role as enum ('admin','student','class_teacher','psychologist');
exception when duplicate_object then null; end $$;

create table if not exists public.school_classes (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  academic_year text not null default '2026-2027',
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role public.app_role not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid unique references public.profiles(id) on delete set null,
  school_id text unique,
  full_name text not null,
  class_id uuid references public.school_classes(id),
  access_code_hash text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.career_tests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  is_published boolean not null default false,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.test_questions (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references public.career_tests(id) on delete cascade,
  question_text text not null,
  options jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0
);

create table if not exists public.test_attempts (
  id uuid primary key default gen_random_uuid(),
  test_id uuid not null references public.career_tests(id),
  student_id uuid not null references public.students(id),
  answers jsonb not null default '{}'::jsonb,
  result jsonb,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.career_recommendations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id),
  title text not null,
  description text,
  source text not null default 'psychologist',
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

alter table public.school_classes enable row level security;
alter table public.profiles enable row level security;
alter table public.students enable row level security;
alter table public.career_tests enable row level security;
alter table public.test_questions enable row level security;
alter table public.test_attempts enable row level security;
alter table public.career_recommendations enable row level security;

-- Төмендегі саясаттар — тек бастапқы үлгі. Рөлдік қатынасты толық тексермей жарияламаңыз.
create or replace function public.current_app_role()
returns public.app_role language sql stable security definer set search_path = public
as $$ select role from public.profiles where id = auth.uid() and is_active = true $$;

create policy "profile self read" on public.profiles for select
using (id = auth.uid() or public.current_app_role() = 'admin');

create policy "admin manage profiles" on public.profiles for all
using (public.current_app_role() = 'admin')
with check (public.current_app_role() = 'admin');

create policy "admin manage classes" on public.school_classes for all
using (public.current_app_role() = 'admin')
with check (public.current_app_role() = 'admin');

create policy "staff read classes" on public.school_classes for select
using (public.current_app_role() in ('admin','class_teacher','psychologist'));

create policy "admin manage students" on public.students for all
using (public.current_app_role() = 'admin')
with check (public.current_app_role() = 'admin');

create policy "staff read students" on public.students for select
using (public.current_app_role() in ('admin','class_teacher','psychologist'));

create policy "published tests readable" on public.career_tests for select
using (is_published = true or public.current_app_role() = 'admin' or public.current_app_role() = 'psychologist');

create policy "admin psychologist manage tests" on public.career_tests for all
using (public.current_app_role() in ('admin','psychologist'))
with check (public.current_app_role() in ('admin','psychologist'));

create policy "questions readable for staff or published test" on public.test_questions for select
using (exists(select 1 from public.career_tests t where t.id=test_id and (t.is_published=true or public.current_app_role() in ('admin','psychologist'))));

create policy "staff read attempts" on public.test_attempts for select
using (public.current_app_role() in ('admin','psychologist','class_teacher'));

create policy "students create own attempts" on public.test_attempts for insert
with check (exists(select 1 from public.students s where s.id=student_id and s.profile_id=auth.uid()));

create policy "students read own attempts" on public.test_attempts for select
using (exists(select 1 from public.students s where s.id=student_id and s.profile_id=auth.uid()));

create policy "staff manage recommendations" on public.career_recommendations for all
using (public.current_app_role() in ('admin','psychologist'))
with check (public.current_app_role() in ('admin','psychologist'));

create policy "student read own recommendations" on public.career_recommendations for select
using (exists(select 1 from public.students s where s.id=student_id and s.profile_id=auth.uid()));
