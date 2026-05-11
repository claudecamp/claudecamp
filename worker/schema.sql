-- Claude Camp bookings + waitlist schema.
-- Safe to re-run: uses IF NOT EXISTS.

CREATE TABLE IF NOT EXISTS bookings (
  id          TEXT PRIMARY KEY,
  cohort      TEXT NOT NULL,
  bed_id      TEXT NOT NULL,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  country     TEXT,
  track       TEXT,
  tier        TEXT,
  building    TEXT,
  message     TEXT,
  committed   INTEGER DEFAULT 0,
  status      TEXT DEFAULT 'applied',
  payment     TEXT DEFAULT 'pending',
  created_at  INTEGER NOT NULL,
  UNIQUE(cohort, bed_id)
);

CREATE INDEX IF NOT EXISTS idx_bookings_cohort ON bookings(cohort);
CREATE INDEX IF NOT EXISTS idx_bookings_email  ON bookings(email);

CREATE TABLE IF NOT EXISTS waitlist (
  id          TEXT PRIMARY KEY,
  cohort      TEXT NOT NULL,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  country     TEXT,
  message     TEXT,
  notified_at INTEGER,
  created_at  INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_waitlist_cohort ON waitlist(cohort);
