-- Fix the RLS policy for users table to allow new registrations

-- First, drop the existing policies
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;

-- Add policy to allow inserts during registration
CREATE POLICY "Allow inserts for new users" 
ON public.users FOR INSERT
WITH CHECK (true);

-- Re-create the view and update policies
CREATE POLICY "Users can view their own data"
ON public.users FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
ON public.users FOR UPDATE
USING (auth.uid() = id);
