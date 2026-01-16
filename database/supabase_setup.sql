-- =====================================================
-- SUPABASE CONTACTS TABLE SETUP
-- Run this query in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard > Your Project > SQL Editor
-- =====================================================

-- CONTACTS TABLE - Store customer inquiries from contact form
CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',  -- new, contacted, resolved
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (submit contact form)
CREATE POLICY "Anyone can submit contact" ON contacts
    FOR INSERT
    WITH CHECK (true);

-- Policy: Only authenticated admins can view contacts
CREATE POLICY "Admins can view contacts" ON contacts
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Policy: Only authenticated admins can update contacts
CREATE POLICY "Admins can update contacts" ON contacts
    FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Function to auto-update updated_at (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_contacts_updated_at ON contacts;
CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- REPAIR PRICES TABLE - Manage phone/tablet repair pricing
-- =====================================================

CREATE TABLE IF NOT EXISTS repair_prices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category VARCHAR(50) NOT NULL,  -- 'iphone', 'ipad'
    service_name VARCHAR(100) NOT NULL,  -- 'Screen', 'Battery', etc.
    model_range VARCHAR(100) NOT NULL,  -- 'iPhone 5/5S/SE/6-8+ & SE2', etc.
    price_min DECIMAL(10,2) NOT NULL,
    price_max DECIMAL(10,2) NOT NULL,
    note VARCHAR(255),  -- Optional note like '$includes new digi'
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_repair_prices_category ON repair_prices(category);
CREATE INDEX IF NOT EXISTS idx_repair_prices_active ON repair_prices(is_active);

-- Enable RLS
ALTER TABLE repair_prices ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view prices (public read)
CREATE POLICY "Anyone can view prices" ON repair_prices
    FOR SELECT
    USING (true);

-- Policy: Only authenticated can modify
CREATE POLICY "Admins can manage prices" ON repair_prices
    FOR ALL
    USING (auth.role() = 'authenticated');

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_repair_prices_updated_at ON repair_prices;
CREATE TRIGGER update_repair_prices_updated_at
    BEFORE UPDATE ON repair_prices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- SEED DATA - Initial iPhone Prices
-- =====================================================

INSERT INTO repair_prices (category, service_name, model_range, price_min, price_max, display_order) VALUES
-- iPhone 5/5S/SE/6-8+ & SE2
('iphone', 'Screen', 'iPhone 5/5S/SE/6-8+ & SE2', 100, 120, 1),
('iphone', 'Battery', 'iPhone 5/5S/SE/6-8+ & SE2', 80, 110, 2),
('iphone', 'Charge Port', 'iPhone 5/5S/SE/6-8+ & SE2', 170, 180, 3),
('iphone', 'Ring Spkr / Ear Spkr', 'iPhone 5/5S/SE/6-8+ & SE2', 110, 120, 4),
('iphone', 'Prox/Frnt Camera', 'iPhone 5/5S/SE/6-8+ & SE2', 110, 120, 5),
('iphone', 'Rear Camera', 'iPhone 5/5S/SE/6-8+ & SE2', 110, 120, 6),
('iphone', 'Rear Cam Lens', 'iPhone 5/5S/SE/6-8+ & SE2', 110, 120, 7),

-- iPhone X - iPhone 17 Pro Max / iPhone Air
('iphone', 'Screen', 'iPhone X - 17 Pro Max / iPhone Air', 140, 525, 1),
('iphone', 'Battery', 'iPhone X - 17 Pro Max / iPhone Air', 128, 170, 2),
('iphone', 'Charge Port', 'iPhone X - 17 Pro Max / iPhone Air', 180, 290, 3),
('iphone', 'Ring Spkr / Ear Spkr', 'iPhone X - 17 Pro Max / iPhone Air', 120, 130, 4),
('iphone', 'Prox/Frnt Camera', 'iPhone X - 17 Pro Max / iPhone Air', 115, 240, 5),
('iphone', 'Rear Camera', 'iPhone X - 17 Pro Max / iPhone Air', 115, 240, 6),
('iphone', 'Rear Cam Lens', 'iPhone X - 17 Pro Max / iPhone Air', 115, 240, 7);

-- =====================================================
-- SEED DATA - Initial iPad Prices
-- =====================================================

INSERT INTO repair_prices (category, service_name, model_range, price_min, price_max, note, display_order) VALUES
-- iPad Air 1 - 13th Gen
('ipad', 'Digitizer', 'iPad Air 1 - 13th Gen', 125, 165, NULL, 1),
('ipad', 'LCD', 'iPad Air 1 - 13th Gen', 145, 480, '$includes new digi', 2),
('ipad', 'Battery', 'iPad Air 1 - 13th Gen', 125, 250, '$includes new digi', 3),

-- iPad Pro 1 - 13th Gen
('ipad', 'Digitizer', 'iPad Pro 1 - 13th Gen', 255, 135, NULL, 1),
('ipad', 'LCD', 'iPad Pro 1 - 13th Gen', 260, 405, '$includes new digi', 2),
('ipad', 'Battery', 'iPad Pro 1 - 13th Gen', 120, 300, '$includes new digi', 3),

-- iPad 2 - 11th Gen
('ipad', 'Digitizer', 'iPad 2 - 11th Gen', 120, 160, NULL, 1),
('ipad', 'LCD', 'iPad 2 - 11th Gen', 130, 235, '$includes new digi', 2),
('ipad', 'Battery', 'iPad 2 - 11th Gen', 120, 220, '$includes new digi', 3);

-- =====================================================
-- USEFUL QUERIES
-- =====================================================

-- View all prices by category:
-- SELECT * FROM repair_prices WHERE category = 'iphone' ORDER BY display_order;

-- Update a price:
-- UPDATE repair_prices SET price_min = 100, price_max = 150 WHERE id = 'price-uuid';

-- Add new service:
-- INSERT INTO repair_prices (category, service_name, model_range, price_min, price_max, display_order)
-- VALUES ('iphone', 'New Service', 'All Models', 50, 100, 10);

-- Deactivate a price:
-- UPDATE repair_prices SET is_active = false WHERE id = 'price-uuid';
