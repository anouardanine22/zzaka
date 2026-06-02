const SUPABASE_URL = "https://zvolxiiwdvkofgitqgzv.supabase.co/rest/v1";
const SUPABASE_KEY = "sb_publishable_KM3XobjGgMXmyJLgQmmVrQ_xIbA6b3E";

const supabaseHeaders = {
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
};

// Initial Seed Data (Hardcoded in JS as absolute fallback)
const INITIAL_SECTIONS = [
    { id: "best_mods", title_en: "Best Mods", title_ar: "أفضل المودات", subtitle_en: "Handpicked top quality content", subtitle_ar: "أفضل المحتويات المختارة بعناية", theme: "theme-red", position: 1, icon_svg: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>' },
    { id: "latest_mods", title_en: "Latest Mods", title_ar: "أحدث المودات", subtitle_en: "Freshly uploaded additions", subtitle_ar: "أحدث الإضافات المرفوعة حديثاً", theme: "theme-orange", position: 2, icon_svg: '<path d="M12 2v10m0 0l-4-4m4 4l4-4" stroke-width="2"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/>' },
    { id: "most_downloaded", title_en: "Most Downloaded", title_ar: "الأكثر تحميلاً", subtitle_en: "Popular among the community", subtitle_ar: "الأكثر شعبية بين اللاعبين", theme: "theme-blue", position: 3, icon_svg: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>' },
    { id: "world_mods", title_en: "World Mods", title_ar: "مودات العوالم", subtitle_en: "Expand your horizons", subtitle_ar: "وسع آفاقك بعوالم جديدة", theme: "theme-purple", position: 4, icon_svg: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>' },
    { id: "all_mods", title_en: "All Mods", title_ar: "جميع المودات", subtitle_en: "Browse our entire catalog", subtitle_ar: "تصفح كامل المكتبة الخاصة بنا", theme: "theme-red", position: 5, icon_svg: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>' }
];

const INITIAL_ITEMS = [
    // Slider Slides
    { id: "s1", name_en: "Dark Fantasy Visuals", name_ar: "بصريات الفانتازيا المظلمة", tag: "textures", img_url: "images/dark_fantasy.jpeg", file_size: "32.1 MB", version: "1.21", download_url: "#", description_en: "A complete dark fantasy texture overhaul pack.", description_ar: "حزمة أنسجة الفانتازيا المظلمة الكاملة.", gallery_images: ["images/dark_fantasy.jpeg"], gallery_videos: [], is_slider: true, is_side_card: false, slider_video_url: "video/videoplayback (1).mp4", position: 0, slider_position: 1, side_card_position: 0, section_id: null },
    { id: "s2", name_en: "RLCraft 1.2 Update", name_ar: "تحديث RLCraft 1.2", tag: "maps", img_url: "images/rlcraft_update.jpeg", file_size: "140 MB", version: "1.20", download_url: "#", description_en: "The ultimate survival integration pack.", description_ar: "حزمة البقاء المطلقة.", gallery_images: ["images/rlcraft_update.jpeg"], gallery_videos: [], is_slider: true, is_side_card: false, slider_video_url: "video/videoplayback (2).mp4", position: 0, slider_position: 2, side_card_position: 0, section_id: null },
    { id: "s3", name_en: "Actions & Stuff", name_ar: "حركات وأشياء", tag: "addons", img_url: "images/actions_stuff.jpeg", file_size: "5.4 MB", version: "1.21.1", download_url: "#", description_en: "Dynamic player animations.", description_ar: "حركات اللاعبين الديناميكية والواقعية.", gallery_images: ["images/actions_stuff.jpeg"], gallery_videos: [], is_slider: true, is_side_card: false, slider_video_url: "video/videoplayback (3).mp4", position: 0, slider_position: 3, side_card_position: 0, section_id: null }
];

const INITIAL_VERSIONS = [
    { id: "v1", name_en: "Minecraft 1.21.0 (Official)", name_ar: "ماين كرافت 1.21.0 (رسمي)", type: "official", link: "#", position: 1 },
    { id: "v2", name_en: "Minecraft 1.20.80 (Official)", name_ar: "ماين كرافت 1.20.80 (رسمي)", type: "official", link: "#", position: 2 },
    { id: "p1", name_en: "Performance Patch v1.2", name_ar: "باتش تحسين الأداء v1.2", type: "patch", link: "#", position: 1 },
    { id: "p2", name_en: "Bug Fix Bundle", name_ar: "حزمة إصلاح الأخطاء", type: "patch", link: "#", position: 2 }
];

// Data versioning to clear old dummy data from users' browsers
const DATA_VERSION = "v3.4_slider_fix";

// Helper to initialize local storage cache
function getLocalCache(key, initialData) {
    const currentVersion = localStorage.getItem('zxko_data_version');
    
    // If version changes, we NO LONGER wipe everything. 
    // Instead, we just update the version and ensure initial items are merged.
    if (currentVersion !== DATA_VERSION) {
        localStorage.setItem('zxko_data_version', DATA_VERSION);
    }

    let cached = localStorage.getItem(key);
    if (!cached) {
        localStorage.setItem(key, JSON.stringify(initialData));
        return initialData;
    }
    
    let cachedData = JSON.parse(cached);
    
    // Merge initial system items into cache without removing user-added items
    if (Array.isArray(initialData) && Array.isArray(cachedData)) {
        let changed = false;
        initialData.forEach(initItem => {
            const idx = cachedData.findIndex(c => c.id === initItem.id);
            if (idx === -1) {
                cachedData.push(initItem);
                changed = true;
            }
        });
        if (changed) {
            localStorage.setItem(key, JSON.stringify(cachedData));
        }
    }
    return cachedData;
}

function setLocalCache(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Low level REST request
async function supabaseRequest(endpoint, options = {}) {
    const url = `${SUPABASE_URL}/${endpoint}`;
    const response = await fetch(url, {
        ...options,
        headers: {
            ...supabaseHeaders,
            ...options.headers
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    if (response.status === 204) return null;
    return await response.json();
}

const SupabaseClient = {
    // ---------------- SECTIONS ----------------
    async getSections() {
        try {
            const data = await supabaseRequest("sections?select=*&order=position.asc");
            if (data && data.length > 0) {
                // Ensure initial sections are always present in cache if they exist on server
                const sections = getLocalCache('zxko_sections', INITIAL_SECTIONS);
                data.forEach(srvSec => {
                    const idx = sections.findIndex(c => c.id === srvSec.id);
                    if (idx > -1) sections[idx] = srvSec;
                    else sections.push(srvSec);
                });
                setLocalCache('zxko_sections', sections);
                return sections;
            }
        } catch (e) {
            console.warn("Supabase sections fetch failed, loading cache", e);
        }
        return getLocalCache('zxko_sections', INITIAL_SECTIONS).sort((a,b) => a.position - b.position);
    },
    
    async saveSection(section) {
        // Local persistence
        const sections = getLocalCache('zxko_sections', INITIAL_SECTIONS);
        const index = sections.findIndex(s => s.id === section.id);
        if (index > -1) {
            sections[index] = section;
        } else {
            sections.push(section);
        }
        setLocalCache('zxko_sections', sections);

        // Server persistence
        try {
            let exists = false;
            try {
                const res = await supabaseRequest(`sections?id=eq.${section.id}`);
                exists = res && res.length > 0;
            } catch(e){}
            const method = exists ? "PATCH" : "POST";
            const endpoint = exists ? `sections?id=eq.${section.id}` : "sections";
            await supabaseRequest(endpoint, {
                method,
                body: JSON.stringify(section)
            });
        } catch (e) {
            console.warn("Supabase failed, saved locally inside localStorage only", e);
        }
        return section;
    },

    async deleteSection(id) {
        // Local persistence
        const sections = getLocalCache('zxko_sections', INITIAL_SECTIONS);
        const filtered = sections.filter(s => s.id !== id);
        setLocalCache('zxko_sections', filtered);

        // Server persistence
        try {
            await supabaseRequest(`sections?id=eq.${id}`, { method: "DELETE" });
        } catch (e) {
            console.warn("Supabase delete failed, processed locally only", e);
        }
    },

    async reorderSections(sectionsList) {
        // Local persistence
        const sections = getLocalCache('zxko_sections', INITIAL_SECTIONS);
        sectionsList.forEach((sec, idx) => {
            const index = sections.findIndex(s => s.id === sec.id);
            if (index > -1) sections[index].position = idx + 1;
        });
        setLocalCache('zxko_sections', sections);

        // Server persistence
        try {
            for (let i = 0; i < sectionsList.length; i++) {
                await supabaseRequest(`sections?id=eq.${sectionsList[i].id}`, {
                    method: "PATCH",
                    body: JSON.stringify({ position: i + 1 })
                });
            }
        } catch(e) {
            console.warn("Supabase reorder failed, saved locally only", e);
        }
    },

    // ---------------- UNIFIED ITEMS CRUD (Mods, Slider, Side Cards) ----------------
    async getSliderItems() {
        try {
            const data = await supabaseRequest("items?select=*&is_slider=eq.true&order=slider_position.asc");
            const items = getLocalCache('zxko_items', INITIAL_ITEMS);
            
            if (data && data.length > 0) {
                // Merge server items into cache
                data.forEach(srvItem => {
                    const idx = items.findIndex(c => c.id === srvItem.id);
                    if (idx > -1) items[idx] = srvItem;
                    else items.push(srvItem);
                });
                setLocalCache('zxko_items', items);
            }
        } catch (e) {
            console.warn("Supabase slider fetch failed, loading cache", e);
        }
        
        // Return slider items from cache, ensuring we have at least 3 if possible
        const cached = getLocalCache('zxko_items', INITIAL_ITEMS);
        let sliders = cached.filter(i => i.is_slider).sort((a,b) => a.slider_position - b.slider_position);
        
        // If for some reason we have fewer than 3, fallback to INITIAL_ITEMS for the missing ones
        if (sliders.length < 3) {
            INITIAL_ITEMS.forEach(initItem => {
                if (sliders.length < 3 && !sliders.find(s => s.id === initItem.id)) {
                    sliders.push(initItem);
                }
            });
        }
        
        return sliders.sort((a,b) => a.slider_position - b.slider_position);
    },

    async saveSliderItem(item) {
        const items = getLocalCache('zxko_items', INITIAL_ITEMS);
        item.is_slider = true;
        
        if (!item.id) {
            // New slider item
            item.id = "local_" + Math.random().toString(36).substr(2, 9);
            items.push(item);
        } else {
            const index = items.findIndex(i => i.id === item.id);
            if (index > -1) items[index] = { ...items[index], ...item };
        }
        setLocalCache('zxko_items', items);

        // Server persistence
        try {
            const serverItem = { ...item };
            if (serverItem.id.startsWith("local_")) delete serverItem.id;
            const isUpdate = !!item.id && !item.id.startsWith("local_");
            const method = isUpdate ? "PATCH" : "POST";
            const endpoint = isUpdate ? `items?id=eq.${item.id}` : "items";
            const res = await supabaseRequest(endpoint, {
                method,
                body: JSON.stringify(serverItem)
            });
            if (res && res.length > 0) {
                // Replace temp local id with supabase generated id
                const freshItems = getLocalCache('zxko_items', INITIAL_ITEMS);
                const tempIndex = freshItems.findIndex(i => i.id === item.id);
                if (tempIndex > -1) {
                    freshItems[tempIndex] = res[0];
                    setLocalCache('zxko_items', freshItems);
                }
            }
        } catch (e) {
            console.warn("Supabase failed, saved locally inside localStorage only", e);
        }
        return item;
    },

    async deleteSliderItem(id) {
        // Local persistence
        const items = getLocalCache('zxko_items', INITIAL_ITEMS);
        const index = items.findIndex(i => i.id === id);
        if (index > -1) {
            // Instead of deleting the item entirely, we just disable the slider flag
            // so it stays in the normal mod catalog if applicable, or we delete it if it was only a slider.
            if (!items[index].is_side_card && !items[index].section_id) {
                items.splice(index, 1);
            } else {
                items[index].is_slider = false;
                items[index].slider_position = 0;
            }
            setLocalCache('zxko_items', items);
        }

        // Server persistence
        try {
            // First check if it's in other sections, if so, patch, else delete
            const currentItem = await supabaseRequest(`items?id=eq.${id}`);
            if (currentItem && currentItem.length > 0) {
                const sItem = currentItem[0];
                if (!sItem.is_side_card && !sItem.section_id) {
                    await supabaseRequest(`items?id=eq.${id}`, { method: "DELETE" });
                } else {
                    await supabaseRequest(`items?id=eq.${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({ is_slider: false, slider_position: 0 })
                    });
                }
            }
        } catch (e) {
            console.warn("Supabase delete failed, processed locally only", e);
        }
    },

    async reorderSliderItems(itemsList) {
        // Local reordering
        const items = getLocalCache('zxko_items', INITIAL_ITEMS);
        itemsList.forEach((sec, idx) => {
            const index = items.findIndex(i => i.id === sec.id);
            if (index > -1) items[index].slider_position = idx + 1;
        });
        setLocalCache('zxko_items', items);

        // Server reordering
        try {
            for (let i = 0; i < itemsList.length; i++) {
                if (itemsList[i].id.startsWith("local_")) continue;
                await supabaseRequest(`items?id=eq.${itemsList[i].id}`, {
                    method: "PATCH",
                    body: JSON.stringify({ slider_position: i + 1 })
                });
            }
        } catch(e) {
            console.warn("Supabase slider reorder failed, local updated", e);
        }
    },

    // ---------------- SIDE CARDS ----------------
    async getSideCards() {
        try {
            const data = await supabaseRequest("items?select=*&is_side_card=eq.true&order=side_card_position.asc");
            const items = getLocalCache('zxko_items', INITIAL_ITEMS);
            if (data && data.length > 0) {
                const sideIds = data.map(d => d.id);
                const cleaned = items.filter(item => !item.is_side_card || sideIds.includes(item.id));
                data.forEach(srvItem => {
                    const idx = cleaned.findIndex(c => c.id === srvItem.id);
                    if (idx > -1) cleaned[idx] = srvItem;
                    else cleaned.push(srvItem);
                });
                setLocalCache('zxko_items', cleaned);
                return cleaned.filter(i => i.is_side_card).sort((a,b) => a.side_card_position - b.side_card_position);
            }
        } catch (e) {
            console.warn("Supabase side cards fetch failed, loading cache", e);
        }
        return getLocalCache('zxko_items', INITIAL_ITEMS).filter(i => i.is_side_card).sort((a,b) => a.side_card_position - b.side_card_position);
    },

    async saveSideCard(card) {
        const items = getLocalCache('zxko_items', INITIAL_ITEMS);
        card.is_side_card = true;

        if (!card.id) {
            card.id = "local_" + Math.random().toString(36).substr(2, 9);
            items.push(card);
        } else {
            const index = items.findIndex(i => i.id === card.id);
            if (index > -1) items[index] = { ...items[index], ...card };
        }
        setLocalCache('zxko_items', items);

        // Server persistence
        try {
            const serverCard = { ...card };
            if (serverCard.id.startsWith("local_")) delete serverCard.id;
            const isUpdate = !!card.id && !card.id.startsWith("local_");
            const method = isUpdate ? "PATCH" : "POST";
            const endpoint = isUpdate ? `items?id=eq.${card.id}` : "items";
            const res = await supabaseRequest(endpoint, {
                method,
                body: JSON.stringify(serverCard)
            });
            if (res && res.length > 0) {
                const freshItems = getLocalCache('zxko_items', INITIAL_ITEMS);
                const tempIndex = freshItems.findIndex(i => i.id === card.id);
                if (tempIndex > -1) {
                    freshItems[tempIndex] = res[0];
                    setLocalCache('zxko_items', freshItems);
                }
            }
        } catch (e) {
            console.warn("Supabase failed, saved locally inside localStorage only", e);
        }
        return card;
    },

    async deleteSideCard(id) {
        const items = getLocalCache('zxko_items', INITIAL_ITEMS);
        const index = items.findIndex(i => i.id === id);
        if (index > -1) {
            if (!items[index].is_slider && !items[index].section_id) {
                items.splice(index, 1);
            } else {
                items[index].is_side_card = false;
                items[index].side_card_position = 0;
            }
            setLocalCache('zxko_items', items);
        }

        // Server persistence
        try {
            // First check if it's in other sections, if so, patch, else delete
            const currentItem = await supabaseRequest(`items?id=eq.${id}`);
            if (currentItem && currentItem.length > 0) {
                const sItem = currentItem[0];
                if (!sItem.is_slider && !sItem.section_id) {
                    await supabaseRequest(`items?id=eq.${id}`, { method: "DELETE" });
                } else {
                    await supabaseRequest(`items?id=eq.${id}`, {
                        method: "PATCH",
                        body: JSON.stringify({ is_side_card: false, side_card_position: 0 })
                    });
                }
            }
        } catch (e) {
            console.warn("Supabase delete failed, processed locally only", e);
        }
    },

    // ---------------- GENERAL MODS/ITEMS ----------------
    async getItems(filters = {}) {
        try {
            let queryParams = "select=*&order=position.asc";
            if (filters.section_id) {
                queryParams += `&section_id=eq.${filters.section_id}`;
            }
            if (filters.tag) {
                queryParams += `&tag=eq.${filters.tag}`;
            }
            const data = await supabaseRequest(`items?${queryParams}`);
            
            // If server returns data, merge and return it
            const items = getLocalCache('zxko_items', INITIAL_ITEMS);
            if (data && data.length > 0) {
                data.forEach(srvItem => {
                    const idx = items.findIndex(c => c.id === srvItem.id);
                    if (idx > -1) items[idx] = srvItem;
                    else items.push(srvItem);
                });
                setLocalCache('zxko_items', items);
            }
            
            // Return everything from cache that matches filters
            return items.filter(item => {
                if (filters.section_id && item.section_id !== filters.section_id) return false;
                if (filters.tag && item.tag !== filters.tag) return false;
                return true;
            }).sort((a,b) => a.position - b.position);
        } catch (e) {
            console.warn("Supabase items fetch failed, loading cache", e);
        }
        
        // If server is empty or failed, return EVERYTHING from cache that matches filters
        let cached = getLocalCache('zxko_items', INITIAL_ITEMS);
        return cached.filter(item => {
            if (filters.section_id && item.section_id !== filters.section_id) return false;
            if (filters.tag && item.tag !== filters.tag) return false;
            return true;
        }).sort((a,b) => a.position - b.position);
    },

    async getItemById(id) {
        try {
            const data = await supabaseRequest(`items?id=eq.${id}`);
            if (data && data.length > 0) {
                // Cache it
                const items = getLocalCache('zxko_items', INITIAL_ITEMS);
                const idx = items.findIndex(c => c.id === id);
                if (idx > -1) items[idx] = data[0];
                else items.push(data[0]);
                setLocalCache('zxko_items', items);
                return data[0];
            }
        } catch (e) {
            console.warn("Supabase item fetch failed, loading cache", e);
        }
        return getLocalCache('zxko_items', INITIAL_ITEMS).find(i => i.id === id);
    },

    async saveItem(item) {
        const items = getLocalCache('zxko_items', INITIAL_ITEMS);
        if (!item.id) {
            item.id = "local_" + Math.random().toString(36).substr(2, 9);
            items.push(item);
        } else {
            const index = items.findIndex(i => i.id === item.id);
            if (index > -1) items[index] = { ...items[index], ...item };
        }
        setLocalCache('zxko_items', items);

        // Server persistence
        try {
            const serverItem = { ...item };
            if (serverItem.id.startsWith("local_")) delete serverItem.id;
            const isUpdate = !!item.id && !item.id.startsWith("local_");
            const method = isUpdate ? "PATCH" : "POST";
            const endpoint = isUpdate ? `items?id=eq.${item.id}` : "items";
            const res = await supabaseRequest(endpoint, {
                method,
                body: JSON.stringify(serverItem)
            });
            if (res && res.length > 0) {
                const freshItems = getLocalCache('zxko_items', INITIAL_ITEMS);
                const tempIndex = freshItems.findIndex(i => i.id === item.id);
                if (tempIndex > -1) {
                    freshItems[tempIndex] = res[0];
                    setLocalCache('zxko_items', freshItems);
                }
            }
        } catch (e) {
            console.warn("Supabase failed, saved locally inside localStorage only", e);
        }
        return item;
    },

    async deleteItem(id) {
        // Local persistence
        const items = getLocalCache('zxko_items', INITIAL_ITEMS);
        const filtered = items.filter(i => i.id !== id);
        setLocalCache('zxko_items', filtered);

        // Server persistence
        try {
            await supabaseRequest(`items?id=eq.${id}`, { method: "DELETE" });
        } catch (e) {
            console.warn("Supabase delete failed, processed locally only", e);
        }
    },

    async reorderItems(itemsList) {
        const items = getLocalCache('zxko_items', INITIAL_ITEMS);
        itemsList.forEach((sec, idx) => {
            const index = items.findIndex(i => i.id === sec.id);
            if (index > -1) items[index].position = idx + 1;
        });
        setLocalCache('zxko_items', items);

        try {
            for (let i = 0; i < itemsList.length; i++) {
                if (itemsList[i].id.startsWith("local_")) continue;
                await supabaseRequest(`items?id=eq.${itemsList[i].id}`, {
                    method: "PATCH",
                    body: JSON.stringify({ position: i + 1 })
                });
            }
        } catch(e) {
            console.warn("Supabase reorder failed, local updated", e);
        }
    },

    // ---------------- MINECRAFT VERSIONS ----------------
    async getMinecraftVersions() {
        try {
            const data = await supabaseRequest("minecraft_versions?select=*&order=position.asc");
            if (data && data.length > 0) {
                const versions = getLocalCache('zxko_versions', INITIAL_VERSIONS);
                // Merge server data into cache
                data.forEach(srvVer => {
                    const idx = versions.findIndex(v => v.id === srvVer.id);
                    if (idx > -1) versions[idx] = srvVer;
                    else versions.push(srvVer);
                });
                setLocalCache('zxko_versions', versions);
                return versions;
            }
        } catch (e) {
            console.warn("Supabase versions fetch failed, loading cache", e);
        }
        return getLocalCache('zxko_versions', INITIAL_VERSIONS).sort((a,b) => a.position - b.position);
    },

    async saveMinecraftVersion(version) {
        const versions = getLocalCache('zxko_versions', []);
        if (!version.id) {
            version.id = "local_" + Math.random().toString(36).substr(2, 9);
            versions.push(version);
        } else {
            const index = versions.findIndex(v => v.id === version.id);
            if (index > -1) versions[index] = { ...versions[index], ...version };
        }
        setLocalCache('zxko_versions', versions);

        try {
            const serverVersion = { ...version };
            if (serverVersion.id.toString().startsWith("local_")) delete serverVersion.id;
            const isUpdate = !!version.id && !version.id.toString().startsWith("local_");
            const method = isUpdate ? "PATCH" : "POST";
            const endpoint = isUpdate ? `minecraft_versions?id=eq.${version.id}` : "minecraft_versions";
            await supabaseRequest(endpoint, {
                method,
                body: JSON.stringify(serverVersion)
            });
        } catch (e) {
            console.warn("Supabase version save failed, saved locally", e);
        }
        return version;
    },

    async deleteMinecraftVersion(id) {
        const versions = getLocalCache('zxko_versions', []);
        const filtered = versions.filter(v => v.id !== id);
        setLocalCache('zxko_versions', filtered);

        try {
            await supabaseRequest(`minecraft_versions?id=eq.${id}`, { method: "DELETE" });
        } catch (e) {
            console.warn("Supabase version delete failed", e);
        }
    }
};
