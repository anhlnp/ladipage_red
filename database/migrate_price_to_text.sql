-- =====================================================
-- MIGRATION: Convert price_min and price_max from DECIMAL to TEXT
-- This allows storing text values like "$100", "Call for price", etc.
-- Run this in Supabase SQL Editor
-- =====================================================

-- Step 1: Add new temporary TEXT columns
ALTER TABLE repair_prices ADD COLUMN price_min_text TEXT;
ALTER TABLE repair_prices ADD COLUMN price_max_text TEXT;

-- Step 2: Copy existing numeric values as text (with $ prefix)
UPDATE repair_prices SET 
    price_min_text = CAST(price_min AS TEXT),
    price_max_text = CAST(price_max AS TEXT);

-- Step 3: Drop old DECIMAL columns
ALTER TABLE repair_prices DROP COLUMN price_min;
ALTER TABLE repair_prices DROP COLUMN price_max;

-- Step 4: Rename new TEXT columns to original names
ALTER TABLE repair_prices RENAME COLUMN price_min_text TO price_min;
ALTER TABLE repair_prices RENAME COLUMN price_max_text TO price_max;

-- Step 5: Set NOT NULL constraint on new columns
ALTER TABLE repair_prices ALTER COLUMN price_min SET NOT NULL;
ALTER TABLE repair_prices ALTER COLUMN price_max SET NOT NULL;

-- Verify the changes
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'repair_prices' 
AND column_name IN ('price_min', 'price_max');
