-- ============================================
-- SUPABASE DATABASE SCHEMA
-- The Powder Legacy E-Commerce Platform
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CMS CONTENT TABLE
-- Stores all admin-managed content
-- ============================================

CREATE TABLE IF NOT EXISTS cms_content (
  id TEXT PRIMARY KEY,
  content_type TEXT NOT NULL,
  data JSONB NOT NULL,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  updated_by TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_cms_content_type ON cms_content(content_type);

-- Insert default content types
INSERT INTO cms_content (id, content_type, data) VALUES
  ('products', 'products', '[]'::jsonb),
  ('home_content', 'home', '{}'::jsonb),
  ('header_content', 'header', '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- ORDERS TABLE
-- Stores customer orders
-- ============================================

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id TEXT UNIQUE NOT NULL,
  payment_id TEXT,
  payment_method TEXT DEFAULT 'razorpay',
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  totals JSONB NOT NULL DEFAULT '{}'::jsonb,
  delivery_info JSONB,
  shipping_address JSONB,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for orders
CREATE INDEX IF NOT EXISTS idx_orders_order_id ON orders(order_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- ============================================
-- CONTACT MESSAGES TABLE
-- Stores customer inquiries
-- ============================================

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  replied_at TIMESTAMPTZ
);

-- Indexes for contact messages
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);

-- ============================================
-- USER CARTS TABLE
-- Stores cart items for logged-in users
-- ============================================

CREATE TABLE IF NOT EXISTS user_carts (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_carts_updated_at ON user_carts(updated_at DESC);

-- ============================================
-- USER FAVORITES TABLE
-- Stores user's favorite products
-- ============================================

CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Indexes for favorites
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_favorites_product_id ON user_favorites(product_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- CMS Content Policies
-- Allow public read and write since admin panel has separate authentication
CREATE POLICY "Public can read CMS content"
  ON cms_content FOR SELECT
  USING (true);

CREATE POLICY "Allow updates to CMS content"
  ON cms_content FOR UPDATE
  USING (true);

CREATE POLICY "Allow inserts to CMS content"
  ON cms_content FOR INSERT
  WITH CHECK (true);

-- Orders Policies
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read orders"
  ON orders FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update their orders"
  ON orders FOR UPDATE
  USING (auth.uid() = user_id);

-- Contact Messages Policies
CREATE POLICY "Anyone can create contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read contact messages"
  ON contact_messages FOR SELECT
  USING (auth.role() = 'authenticated');

-- User Carts Policies
CREATE POLICY "Users can manage their own cart"
  ON user_carts FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User Favorites Policies
CREATE POLICY "Users can manage their own favorites"
  ON user_favorites FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for orders table
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for user_carts table
DROP TRIGGER IF EXISTS update_user_carts_updated_at ON user_carts;
CREATE TRIGGER update_user_carts_updated_at
  BEFORE UPDATE ON user_carts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Note: Storage buckets must be created in Supabase Dashboard
-- Required buckets:
--   1. products (public)
--   2. home (public)
--   3. header (public)

-- Storage policies (apply in Supabase Dashboard):
-- Bucket: products
--   - SELECT: public
--   - INSERT: authenticated
--   - UPDATE: authenticated
--   - DELETE: authenticated
--
-- Bucket: home
--   - SELECT: public
--   - INSERT: authenticated
--   - UPDATE: authenticated
--   - DELETE: authenticated
--
-- Bucket: header
--   - SELECT: public
--   - INSERT: authenticated
--   - UPDATE: authenticated
--   - DELETE: authenticated

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Additional composite indexes
CREATE INDEX IF NOT EXISTS idx_orders_user_status ON orders(user_id, status);
CREATE INDEX IF NOT EXISTS idx_cms_content_updated ON cms_content(content_type, last_updated DESC);

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON TABLE cms_content IS 'Stores all CMS content including products, home page, and header configuration';
COMMENT ON TABLE orders IS 'Customer orders with payment and shipping information';
COMMENT ON TABLE contact_messages IS 'Customer inquiries from contact form';
COMMENT ON TABLE user_carts IS 'Shopping cart items for logged-in users';
COMMENT ON TABLE user_favorites IS 'User favorite/wishlist products';

-- ============================================
-- END OF SCHEMA
-- ============================================

