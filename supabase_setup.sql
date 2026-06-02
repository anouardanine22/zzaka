-- 1. Create Sections Table
CREATE TABLE IF NOT EXISTS public.sections (
    id TEXT PRIMARY KEY,
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    subtitle_en TEXT DEFAULT '',
    subtitle_ar TEXT DEFAULT '',
    icon_svg TEXT DEFAULT '',
    theme TEXT NOT NULL DEFAULT 'theme-red',
    position INTEGER NOT NULL DEFAULT 0
);

-- 2. Create Items/Mods Table (Unified Table for Mods, Slider Items, and Side Cards)
CREATE TABLE IF NOT EXISTS public.items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    tag TEXT NOT NULL DEFAULT 'addons', -- 'textures', 'maps', 'addons', 'skins'
    img_url TEXT NOT NULL,
    file_size TEXT DEFAULT '0 KB',
    version TEXT DEFAULT '1.21',
    download_url TEXT DEFAULT '#',
    description_en TEXT DEFAULT '',
    description_ar TEXT DEFAULT '',
    gallery_images JSONB DEFAULT '[]'::jsonb,
    gallery_videos JSONB DEFAULT '[]'::jsonb,
    
    -- Placement Flags
    is_slider BOOLEAN DEFAULT false,
    is_side_card BOOLEAN DEFAULT false,
    
    -- Video link specifically for slider background
    slider_video_url TEXT DEFAULT '',
    
    -- Positioning fields
    position INTEGER NOT NULL DEFAULT 0,
    slider_position INTEGER NOT NULL DEFAULT 0,
    side_card_position INTEGER NOT NULL DEFAULT 0,
    
    -- Section relationship
    section_id TEXT REFERENCES public.sections(id) ON DELETE SET NULL
);

-- 3. Create Minecraft Versions Table
CREATE TABLE IF NOT EXISTS public.minecraft_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'official', -- 'official' or 'patch'
    link TEXT NOT NULL DEFAULT '#',
    position INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Disable Row Level Security (RLS) for public access
ALTER TABLE public.sections DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.items DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.minecraft_versions DISABLE ROW LEVEL SECURITY;

-- Seed Sections
INSERT INTO public.sections (id, title_en, title_ar, subtitle_en, subtitle_ar, theme, position)
VALUES 
('best_mods', 'Best Mods', 'أفضل المودات', 'Handpicked top quality content', 'أفضل المحتويات المختارة بعناية', 'theme-red', 1),
('latest_mods', 'Latest Mods', 'أحدث المودات', 'Freshly uploaded additions', 'أحدث الإضافات المرفوعة حديثاً', 'theme-orange', 2),
('most_downloaded', 'Most Downloaded', 'الأكثر تحميلاً', 'Popular among the community', 'الأكثر شعبية بين اللاعبين', 'theme-blue', 3),
('world_mods', 'World Mods', 'مودات العوالم', 'Expand your horizons', 'وسع آفاقك بعوالم جديدة', 'theme-purple', 4)
ON CONFLICT (id) DO UPDATE 
SET title_en = EXCLUDED.title_en, title_ar = EXCLUDED.title_ar, subtitle_en = EXCLUDED.subtitle_en, subtitle_ar = EXCLUDED.subtitle_ar, theme = EXCLUDED.theme, position = EXCLUDED.position;

-- Seed Slider Items
INSERT INTO public.items (name_en, name_ar, tag, img_url, file_size, version, download_url, description_en, description_ar, gallery_images, gallery_videos, is_slider, slider_video_url, slider_position)
VALUES 
('Dark Fantasy Visuals', 'بصريات الفانتازيا المظلمة', 'textures', 'images/dark_fantasy.jpeg', '32.1 MB', '1.21', '#', 'A complete dark fantasy texture overhaul pack for survival worlds.', 'حزمة أنسجة الفانتازيا المظلمة الكاملة لعوالم البقاء.', '["images/dark_fantasy.jpeg"]'::jsonb, '[]'::jsonb, true, 'video/videoplayback (1).mp4', 1),
('RLCraft 1.2 Update', 'تحديث RLCraft 1.2', 'maps', 'images/rlcraft_update.jpeg', '140 MB', '1.20', '#', 'The ultimate high-difficulty survival mod pack integration.', 'تكامل حزمة مود البقاء القصوى عالية الصعوبة.', '["images/rlcraft_update.jpeg"]'::jsonb, '[]'::jsonb, true, 'video/videoplayback (3).mp4', 2),
('Actions & Stuff', 'حركات وأشياء', 'addons', 'images/actions_stuff.jpeg', '5.4 MB', '1.21.1', '#', 'Dynamic third-person animation pack adding real mob actions.', 'حزمة حركات ديناميكية تعطي الوحوش واللاعبين حركات واقعية.', '["images/actions_stuff.jpeg"]'::jsonb, '[]'::jsonb, true, 'video/videoplayback (2).mp4', 3);

-- Seed Side Cards
INSERT INTO public.items (name_en, name_ar, tag, img_url, file_size, version, download_url, description_en, description_ar, gallery_images, gallery_videos, is_side_card, side_card_position)
VALUES 
('Essentials', 'الأساسيات', 'addons', 'images/essentials_card.png', '3.4 MB', '1.21', '#', 'Bringing critical player animations and UI overlays.', 'يجلب حركات اللاعبين الهامة والواجهات الرسومية الإضافية.', '["images/essentials_card.png"]'::jsonb, '[]'::jsonb, true, 1),
('Prizma Visuals 2.1', 'بصريات بريزما 2.1', 'textures', 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600', '18.2 MB', '1.21', '#', 'Modern stylized bright visuals rendering overhaul.', 'تعديل بصريات ملون وحديث بألوان زاهية وجميلة.', '[]'::jsonb, '[]'::jsonb, true, 2),
('Dynamic Light', 'الضوء الديناميكي', 'addons', 'https://images.unsplash.com/photo-1519669417670-68775a50919c?q=80&w=600', '1.1 MB', '1.20', '#', 'Torch lights will shine in your hands dynamically.', 'ستضيء الشعلات والمشاعل بين يديك بشكل ديناميكي أثناء المشي.', '[]'::jsonb, '[]'::jsonb, true, 3),
('Easy Redstone 1.1', 'ريدستون السهل 1.1', 'addons', 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600', '2.5 MB', '1.21', '#', 'Simplifying logical systems wires and connections layout.', 'تبسيط أنظمة الريدستون المنطقية والأسلاك بشكل سهل للغاية.', '[]'::jsonb, '[]'::jsonb, true, 4);

-- Seed Normal Mods
INSERT INTO public.items (name_en, name_ar, tag, img_url, file_size, version, download_url, description_en, description_ar, gallery_images, gallery_videos, section_id, position)
VALUES 
('Royal Mobs', 'الوحوش الملكية', 'skins', 'https://minecraft.net/content/dam/archive/6e9e4f5a3a4b4e9e9e4f5a3a4b4e9e/RoyalMobs.jpg', '4.2 MB', '1.21.1', '#', 'A custom mobs design expansion.', 'توسيع وحوش ماين كرافت بتصاميم ملكية.', '["https://minecraft.net/content/dam/archive/6e9e4f5a3a4b4e9e9e4f5a3a4b4e9e/RoyalMobs.jpg"]'::jsonb, '[]'::jsonb, 'best_mods', 1),
('Create Add-on', 'إضافة كِريت', 'addons', 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=1200', '12.8 MB', '1.20', '#', 'Create mechanical structures and automation.', 'مود لتصميم الآلات الميكانيكية والأتمتة.', '["https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=1200"]'::jsonb, '[]'::jsonb, 'best_mods', 2),
('Scary', 'مرعب', 'addons', 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=1200', '5.1 MB', '1.21', '#', 'Horror mechanics addon.', 'إضافة آليات الرعب إلى عالمك.', '["https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=1200"]'::jsonb, '[]'::jsonb, 'best_mods', 3),
('Festive Biomes', 'المناطق الحيوية الاحتفالية', 'addons', 'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=1200', '8.9 MB', '1.21', '#', 'Dynamic festive biomes.', 'بيومات احتفالية ديناميكية.', '[]'::jsonb, '[]'::jsonb, 'best_mods', 4),
('Enderman Morph', 'تحول الإندرمان', 'maps', 'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=1200', '3.1 MB', '1.20', '#', 'Become an Enderman.', 'تحول إلى إندرمان.', '[]'::jsonb, '[]'::jsonb, 'latest_mods', 1),
('The Ultimate Survival World', 'عالم البقاء النهائي', 'maps', 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1200', '42 MB', '1.21', '#', 'Castle survival.', 'بقاء في القصر.', '[]'::jsonb, '[]'::jsonb, 'latest_mods', 2),
('SURVIVAL BUT THE WORLD EXPANDS', 'البقاء ولكن العالم يتوسع', 'maps', 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?q=80&w=1200', '1.2 MB', '1.21', '#', 'Survival expansions.', 'توسيع حدود البقاء.', '[]'::jsonb, '[]'::jsonb, 'latest_mods', 3);

-- Seed Skins
INSERT INTO public.items (name_en, name_ar, tag, img_url, file_size, version, download_url, description_en, description_ar, gallery_images, gallery_videos, section_id, position)
VALUES 
('Mostafa Game Over', 'مصطفى جيم اوفر', 'skins', 'https://mc-heads.net/body/Mostafa/180', '15 KB', 'N/A', '#', 'Skin of Mostafa Game Over.', 'سكن مصطفى جيم اوفر.', '[]'::jsonb, '[]'::jsonb, NULL, 1),
('Salar Al-Karaki', 'سالار الكركي', 'skins', 'https://mc-heads.net/body/Salar/180', '15 KB', 'N/A', '#', 'Skin of Salar Al-Karaki.', 'سكن سالار الكركي.', '[]'::jsonb, '[]'::jsonb, NULL, 2);
