import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = 'https://semffcznljmbmftbaogl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_OSvxzzEtDG7zgkmaR4j5gw_2oY7otaQ';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

export async function initCMS() {
    const { data, error } = await supabase.from('site_content').select('*').order('sort_order', { ascending: true });
    if (error || !data) return;

    // 1. Dosazení standardních textů, odkazů a obrázků
    data.forEach(item => {
        if (!item.value) return;

        document.querySelectorAll(`[data-cms="${item.key}"]`).forEach(el => {
            el.innerHTML = decodeHTML(item.value);
        });

        document.querySelectorAll(`[data-cms-href="${item.key}"]`).forEach(el => {
            el.href = item.value;
        });

        document.querySelectorAll(`[data-cms-img="${item.key}"]`).forEach(el => {
            if (el.tagName === 'IMG') el.src = item.value;
            else el.style.backgroundImage = `url('${item.value}')`;
        });
    });

    // 2. Automatické vykreslení nových dynamických odkazů do Burger menu
    const burgerContainer = document.getElementById('dynamic-burger-links');
    if (burgerContainer) {
        const navItems = data.filter(i => i.section === 'Navigace' && i.key.endsWith('_text'));

        burgerContainer.innerHTML = navItems.map(item => {
            const baseKey = item.key.replace('_text', '');
            const hrefItem = data.find(i => i.key === `${baseKey}_href`);
            const targetUrl = hrefItem ? hrefItem.value : '#';

            return `<a href="${targetUrl}" class="menu-link text-teal-300 hover:text-white">${item.value}</a>`;
        }).join('');
    }
}

document.addEventListener('DOMContentLoaded', initCMS);