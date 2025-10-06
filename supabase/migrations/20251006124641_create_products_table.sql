/*
  # Create products table for home decor items

  1. New Tables
    - `products`
      - `id` (uuid, primary key) - Unique identifier for each product
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `category` (text) - Product category (e.g., 'bedsheets', 'curtains')
      - `price` (numeric) - Product price
      - `image_url` (text) - URL to product image
      - `created_at` (timestamptz) - Timestamp when product was added
      
  2. Security
    - Enable RLS on `products` table
    - Add policy for public read access (anyone can view products)
    - No write policies needed as products will be managed separately
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'bedsheets',
  price numeric NOT NULL DEFAULT 0,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (true);