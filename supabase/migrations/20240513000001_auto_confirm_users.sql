-- Disable email confirmation requirement by setting auto-confirm to true
UPDATE auth.config
SET config_data = jsonb_set(config_data, '{mailer, autoconfirm}', 'true');
