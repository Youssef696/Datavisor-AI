-- Create a function to directly update email_confirmed_at for existing users
CREATE OR REPLACE FUNCTION public.confirm_all_users()
RETURNS void AS $$
BEGIN
  UPDATE auth.users
  SET email_confirmed_at = now()
  WHERE email_confirmed_at IS NULL;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER;

-- Execute the function to confirm all existing users
SELECT public.confirm_all_users();

-- Create a trigger function to auto-confirm new users
CREATE OR REPLACE FUNCTION public.auto_confirm_email()
RETURNS trigger AS $$
BEGIN
  NEW.email_confirmed_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS confirm_email_trigger ON auth.users;

-- Create the trigger
CREATE TRIGGER confirm_email_trigger
BEFORE INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.auto_confirm_email();
