
-- Fix function search path on handle_new_user (already has it) and generate_order_number
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  result TEXT;
BEGIN
  result := 'SC-' || to_char(now(), 'YYMMDD') || '-' || lpad(floor(random() * 10000)::text, 4, '0');
  RETURN result;
END;
$$;

-- The "Anyone can create orders" and "Anyone can create order items" WITH CHECK (true) 
-- policies are intentional for guest checkout. Adding rate limiting comment.
-- These are required for guest checkout functionality where unauthenticated users place orders.
-- No change needed - this is by design for the e-commerce guest checkout flow.
