import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

const GH = 'https://raw.githubusercontent.com/littlebyteorg/apple-device-images/main/device';
const SAM = 'https://images.samsung.com/is/image/samsung/p6pim';

const IMAGES: Record<string, string[]> = {
  // ── Apple iPhones ──
  'apple-iphone-16-pro-max-256gb-natural-titanium': [
    `${GH}/iPhone17%2C1/Natural%20Titanium.png`,
    `${GH}/iPhone17%2C1/Black%20Titanium.png`,
  ],
  'apple-iphone-15-pro-128gb-grade-a': [
    `${GH}/iPhone16%2C1/Black%20Titanium.png`,
    `${GH}/iPhone16%2C1/Natural%20Titanium.png`,
  ],
  'apple-iphone-15-128gb-brand-new': [
    `${GH}/iPhone15%2C4/Pink.png`,
    `${GH}/iPhone15%2C4/Black.png`,
  ],
  'apple-iphone-14-256gb-certified-refurbished': [
    `${GH}/iPhone14%2C7/Purple.png`,
    `${GH}/iPhone14%2C7/Blue.png`,
  ],
  'apple-iphone-13-pro-256gb-grade-a': [
    `${GH}/iPhone14%2C2/Sierra%20Blue.png`,
    `${GH}/iPhone14%2C2/Graphite.png`,
  ],
  'apple-iphone-12-128gb-grade-b': [
    `${GH}/iPhone13%2C2/Black.png`,
    `${GH}/iPhone13%2C2/Blue.png`,
  ],
  // ── Apple iPads ──
  'apple-ipad-pro-12-m4-256gb': [
    `${GH}/iPad16%2C5/Space%20Black.png`,
    `${GH}/iPad16%2C5/Silver.png`,
  ],
  'apple-ipad-air-5-m1-256gb': [
    `${GH}/iPad13%2C18/Silver.png`,
    `${GH}/iPad13%2C18/Blue.png`,
  ],
  'apple-ipad-mini-6-256gb': [
    `${GH}/iPad14%2C1/Purple.png`,
    `${GH}/iPad14%2C1/Starlight.png`,
  ],
  // ── Apple AirPods ──
  'apple-airpods-pro-2-usbc': [
    `${GH}/AirPodsPro1%2C2-usbc-case/White.png`,
    `${GH}/AirPodsPro1%2C2-usbc-left/White.png`,
  ],
  // ── Apple Accessories ──
  'apple-magsafe-charger-15w-usbc': [
    `${GH}/MagSafe%20Charger%20%281m%29-2.png`,
    `${GH}/MagSafe%20Duo%20Charger.png`,
  ],
  'apple-lightning-to-usb-cable-1m': [
    `${GH}/Lightning%20to%20USB%20Cable%20%281m%29-1.png`,
    `${GH}/Lightning%20to%20USB%20Cable%20%282m%29.png`,
  ],
  'apple-usb-c-to-lightning-cable-1m': [
    `${GH}/USB-C%20to%20Lightning%20Cable%20%281m%29.png`,
    `${GH}/USB-C%20to%20Lightning%20Cable%20%281m%29-2.png`,
  ],
  'apple-usb-c-60w-cable-1m': [
    `${GH}/USB-C%20Charge%20Cable%20%281m%29.png`,
    `${GH}/240W%20USB-C%20Charge%20Cable%20%282m%29.png`,
  ],
  'apple-20w-usb-c-power-adapter': [
    `${GH}/35W%20Dual%20USB-C%20Port%20Compact%20Power%20Adapter.png`,
    `${GH}/70W%20USB-C%20Power%20Adapter.png`,
  ],
  'apple-earpods-usb-c': [
    `${GH}/EarPods%20with%20Lightning%20Connector.png`,
    `${GH}/EarPods%20with%203.5mm%20Headphone%20Plug.png`,
  ],
  // ── Samsung Smartphones ──
  'samsung-galaxy-s25-ultra-512gb': [
    `${SAM}/it/2501/gallery/it-galaxy-s25-ultra-s938-sm-s938bztheub-thumb-544359864`,
    `${SAM}/it/2501/gallery/it-galaxy-s25-ultra-s938-sm-s938bztheub-544359864`,
  ],
  'samsung-galaxy-s24-ultra-256gb': [
    `${SAM}/uk/2401/gallery/uk-galaxy-s24-ultra-491396-sm-s928bzkgeub-thumb-539463971`,
    `${SAM}/uk/2401/gallery/uk-galaxy-s24-ultra-491396-sm-s928bzkgeub-539463971`,
  ],
  'samsung-galaxy-s24-256gb-grade-a': [
    `${SAM}/uk/2401/gallery/uk-galaxy-s24-sm-s921bzydeub-thumb-539353881`,
    `${SAM}/uk/2401/gallery/uk-galaxy-s24-sm-s921bzydeub-539353881`,
  ],
  'samsung-galaxy-a54-5g-128gb': [
    `${SAM}/fr/2303/gallery/fr-galaxy-a54-a546-sm-a546bzaeub-thumb-539573637`,
    `${SAM}/fr/2303/gallery/fr-galaxy-a54-a546-sm-a546bzaeub-539573637`,
  ],
  // ── Samsung Tablets ──
  'samsung-galaxy-tab-s9-ultra-512gb': [
    `${SAM}/id/sm-x910-sm-x910nzdidxid/gallery/id-galaxy-tab-s9-ultra-sm-x910-sm-x910nzdidxid-thumb-532824371`,
    `${SAM}/id/sm-x910-sm-x910nzdidxid/gallery/id-galaxy-tab-s9-ultra-sm-x910-sm-x910nzdidxid-532824371`,
  ],
  'samsung-galaxy-tab-a9-plus-128gb': [
    `${SAM}/uk/sm-x210nzaaeub/gallery/uk-galaxy-tab-a9-plus-sm-x210-sm-x210nzaaeub-thumb-538905799`,
    `${SAM}/uk/sm-x210nzaaeub/gallery/uk-galaxy-tab-a9-plus-sm-x210-sm-x210nzaaeub-538905788`,
  ],
  // ── Samsung Audio ──
  'samsung-galaxy-buds2-pro-graphite': [
    `${SAM}/uk/2208/gallery/uk-galaxy-buds2-pro-r510-sm-r510nlvaeub-thumb-533240882`,
    `${SAM}/uk/2208/gallery/uk-galaxy-buds2-pro-r510-sm-r510nlvaeub-533240882`,
  ],
  // ── Samsung Accessories ──
  'samsung-usb-c-cable-3a-1-8m': [
    `${SAM}/pk/ep-dx310jbegww/gallery/pk-usb-cable-3a-ep-dx310jbegww-thumb-548710466`,
    `${SAM}/pk/ep-dx310jbegww/gallery/pk-usb-cable-3a-ep-dx310jbegww-548710466`,
  ],
  'samsung-car-charger-45w-15w': [
    `${SAM}/pk/ep-t4511xbegww/gallery/pk-45w-power-adapter-ep-t4511-ep-t4511xbegww-thumb-544023430`,
    `${SAM}/pk/ep-t4511xbegww/gallery/pk-45w-power-adapter-ep-t4511-ep-t4511xbegww-544023430`,
  ],
  'samsung-25w-super-fast-charger': [
    `${SAM}/pk/ep-t2510xbegww/gallery/pk-25w-power-adapter-ep-t2510-518639-ep-t2510xbegww-thumb-542922454`,
    `${SAM}/pk/ep-t2510xbegww/gallery/pk-25w-power-adapter-ep-t2510-518639-ep-t2510xbegww-542922454`,
  ],
  'samsung-45w-super-fast-charger': [
    `${SAM}/pk/ep-t4511xbegww/gallery/pk-45w-power-adapter-ep-t4511-ep-t4511xbegww-thumb-544023430`,
    `${SAM}/pk/ep-t4511xbegww/gallery/pk-45w-power-adapter-ep-t4511-ep-t4511xbegww-544023430`,
  ],
  'samsung-usb-c-cable-5a-1m': [
    `${SAM}/pk/ep-da705bbegww/gallery/pk-usb-c-to-usb-c-cable-1m-ep-da705bbegww-thumb-548717960`,
    `${SAM}/pk/ep-da705bbegww/gallery/pk-usb-c-to-usb-c-cable-1m-ep-da705bbegww-548717960`,
  ],
  'samsung-45w-adapter-with-5a-cable': [
    `${SAM}/pk/ep-t4511xbegww/gallery/pk-45w-power-adapter-ep-t4511-ep-t4511xbegww-thumb-544023430`,
    `${SAM}/pk/ep-da705bbegww/gallery/pk-usb-c-to-usb-c-cable-1m-ep-da705bbegww-thumb-548717960`,
  ],
  // ── Xiaomi ──
  'xiaomi-14-ultra-512gb': [
    'https://viostore.vn/wp-content/uploads/2024/02/3-2-510x510.png',
    'https://viostore.vn/wp-content/uploads/2024/02/3-2-510x510.png',
  ],
  'xiaomi-pad-6-pro-256gb': [
    'https://images.kabum.com.br/produtos/fotos/sync_mirakl/580369/Tablet-Xiaomi-Mi-Pad-6-8GB-RAM-128GB-Octa-Core-Camera-13MP-Tela-De-11-Gravity-Gray_1716309108_gg.jpg',
    'https://images.kabum.com.br/produtos/fotos/sync_mirakl/580369/Tablet-Xiaomi-Mi-Pad-6-8GB-RAM-128GB-Octa-Core-Camera-13MP-Tela-De-11-Gravity-Gray_1716309108_gg.jpg',
  ],
  // ── Huawei ──
  'huawei-pura-70-ultra-512gb': [
    'https://sonpixel.vn/wp-content/uploads/2024/04/huawei-pura-70-ultra-13.webp',
    'https://sonpixel.vn/wp-content/uploads/2024/04/huawei-pura-70-ultra-13.webp',
  ],
  // ── OPPO ──
  'oppo-find-x7-ultra-512gb': [
    'https://viostore.vn/wp-content/uploads/2024/03/3-7-510x510.png',
    'https://viostore.vn/wp-content/uploads/2024/03/3-7-510x510.png',
  ],
  // ── Vivo ──
  'vivo-x100-pro-512gb': [
    'https://viostore.vn/wp-content/uploads/2024/04/6-1-510x510.png',
    'https://viostore.vn/wp-content/uploads/2024/04/6-1-510x510.png',
  ],
  // ── OEM Accessories ──
  '65w-gan-usbc-charger-bulk-x10': [
    'https://placehold.co/400x400/1a1a1a/FFFFFF?text=65W+GaN+Charger',
    'https://placehold.co/400x400/2a2a2a/FFFFFF?text=Bulk+x10',
  ],
  'tempered-glass-screen-protectors-bulk-x50': [
    'https://placehold.co/400x400/0a0a0a/FFFFFF?text=9H+Tempered+Glass',
    'https://placehold.co/400x400/111111/FFFFFF?text=Bulk+x50',
  ],
  'silicone-phone-cases-bulk-x50': [
    'https://placehold.co/400x400/334155/FFFFFF?text=Silicone+Cases',
    'https://placehold.co/400x400/475569/FFFFFF?text=20%2B+Colors',
  ],
};

export async function GET() {
  try {
    const supabase = createAdminClient();

    // Fetch products with empty or null images
    const { data: products, error: fetchError } = await supabase
      .from('products')
      .select('id, slug, images');

    if (fetchError) {
      return NextResponse.json({ ok: false, error: fetchError.message }, { status: 500 });
    }

    const results: { slug: string; status: string; error?: string }[] = [];

    for (const product of products ?? []) {
      const isEmpty = !product.images || product.images.length === 0;
      if (!isEmpty) {
        results.push({ slug: product.slug, status: 'skipped (already has images)' });
        continue;
      }

      const images = IMAGES[product.slug];
      if (!images) {
        results.push({ slug: product.slug, status: 'no mapping found' });
        continue;
      }

      const { error: updateError } = await supabase
        .from('products')
        .update({ images, updated_at: new Date().toISOString() })
        .eq('id', product.id);

      results.push({
        slug: product.slug,
        status: updateError ? 'error' : 'updated',
        error: updateError?.message,
      });
    }

    const updated  = results.filter(r => r.status === 'updated').length;
    const skipped  = results.filter(r => r.status.startsWith('skipped')).length;
    const noMap    = results.filter(r => r.status === 'no mapping found').length;
    const errors   = results.filter(r => r.status === 'error').length;

    return NextResponse.json({ ok: true, summary: { updated, skipped, noMap, errors }, results });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
