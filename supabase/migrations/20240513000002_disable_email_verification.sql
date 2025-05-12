-- Create a function to disable email confirmation requirement
CREATE OR REPLACE FUNCTION auth.confirm_user(user_id uuid)
RETURNS void AS $$
BEGIN
  -- Update the user's email_confirmed_at field directly
  UPDATE auth.users
  SET email_confirmed_at = now()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically confirm new users
CREATE OR REPLACE FUNCTION auth.auto_confirm_user()
RETURNS trigger AS $$
BEGIN
  -- Set email_confirmed_at to current timestamp for new users
  NEW.email_confirmed_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS auto_confirm_user_trigger ON auth.users;

-- Create the trigger on the users table
CREATE TRIGGER auto_confirm_user_trigger
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auth.auto_confirm_user();

-- Confirm any existing users that aren't confirmed yet
UPDATE auth.users
SET email_confirmed_at = now()
WHERE email_confirmed_at IS NULL;
