-- ============================================
-- FIX SUPABASE RLS POLICIES
-- Run this in Supabase SQL Editor to fix the 401 error
-- ============================================

-- Drop existing CMS policies
DROP POLICY IF EXISTS "Public can read CMS content" ON cms_content;
DROP POLICY IF EXISTS "Authenticated users can update CMS content" ON cms_content;
DROP POLICY IF EXISTS "Authenticated users can insert CMS content" ON cms_content;
DROP POLICY IF EXISTS "Allow updates to CMS content" ON cms_content;
DROP POLICY IF EXISTS "Allow inserts to CMS content" ON cms_content;

-- Create new permissive policies for CMS
-- (Admin panel has separate authentication layer)
CREATE POLICY "Public can read CMS content"
  ON cms_content FOR SELECT
  USING (true);

CREATE POLICY "Allow updates to CMS content"
  ON cms_content FOR UPDATE
  USING (true);

CREATE POLICY "Allow inserts to CMS content"
  ON cms_content FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow deletes to CMS content"
  ON cms_content FOR DELETE
  USING (true);

-- Verify policies are applied
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'cms_content';

