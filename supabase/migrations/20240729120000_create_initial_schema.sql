
-- Create custom enum types for status fields
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'no-show');

-- 1. Profiles Table
-- Extends auth.users to store public user information
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Function to create a profile for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, avatar_url)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 2. Services Table
-- Static catalog of available services
CREATE TABLE public.services (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    duration INT NOT NULL, -- Duration in minutes
    category TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Services are viewable by everyone." ON public.services FOR SELECT USING (true);
-- Add policies for admin mutations later if needed


-- 3. Vehicles Table
-- Stores user-owned vehicles
CREATE TABLE public.vehicles (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INT NOT NULL,
    license_plate TEXT,
    vin TEXT,
    mileage INT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own vehicles." ON public.vehicles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own vehicles." ON public.vehicles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own vehicles." ON public.vehicles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own vehicles." ON public.vehicles FOR DELETE USING (auth.uid() = user_id);


-- 4. Time Slots Table
-- Manages availability for bookings
CREATE TABLE public.time_slots (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    max_capacity INT NOT NULL DEFAULT 1,
    booked_count INT NOT NULL DEFAULT 0,
    is_available BOOLEAN GENERATED ALWAYS AS (booked_count < max_capacity) STORED,
    UNIQUE(slot_date, start_time)
);
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Time slots are viewable by everyone." ON public.time_slots FOR SELECT USING (true);
-- Add policies for admin mutations later if needed


-- 5. Bookings Table
-- Stores service bookings for registered and guest users
CREATE TABLE public.bookings (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    vehicle_id BIGINT REFERENCES public.vehicles(id) ON DELETE SET NULL,
    service_id BIGINT NOT NULL REFERENCES public.services(id) ON DELETE RESTRICT,
    time_slot_id BIGINT NOT NULL REFERENCES public.time_slots(id) ON DELETE RESTRICT,
    guest_email TEXT,
    guest_phone TEXT,
    vehicle_info JSONB, -- For guest vehicle details: { "make": "Toyota", "model": "Camry", "year": 2021 }
    status booking_status NOT NULL DEFAULT 'pending',
    total_price NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_user_or_guest CHECK (user_id IS NOT NULL OR (guest_email IS NOT NULL AND guest_phone IS NOT NULL)),
    CONSTRAINT chk_vehicle_or_guest_info CHECK (vehicle_id IS NOT NULL OR vehicle_info IS NOT NULL)
);
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own bookings." ON public.bookings FOR SELECT USING (auth.uid() = user_id);
-- More complex policies for inserts/updates will be needed


-- 6. Blog Posts Table
-- Content for the blog
CREATE TABLE public.blog_posts (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image_url TEXT,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published blog posts are viewable by everyone." ON public.blog_posts FOR SELECT USING (published_at IS NOT NULL AND published_at <= NOW());
-- Add policies for admin/author mutations later


-- 7. FAQ Items Table
-- For the Frequently Asked Questions section
CREATE TABLE public.faq_items (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT,
    order_index INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.faq_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "FAQ items are viewable by everyone." ON public.faq_items FOR SELECT USING (true);
-- Add policies for admin mutations later
