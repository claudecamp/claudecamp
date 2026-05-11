-- Add Stripe session ID column for webhook lookup.
-- Run once: npx wrangler d1 execute claudecamp-bookings --remote --file=worker/migrate-stripe.sql
ALTER TABLE bookings ADD COLUMN stripe_session_id TEXT;
