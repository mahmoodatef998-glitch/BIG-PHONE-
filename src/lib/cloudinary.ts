const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';
const PLACEHOLDER_CLOUD_NAMES = new Set(['your_cloud_name', 'your-cloud-name']);

function isCloudinaryConfigured(): boolean {
  return !!CLOUD_NAME && !PLACEHOLDER_CLOUD_NAMES.has(CLOUD_NAME);
}

export function cloudinaryUrl(
  src: string,
  opts: { width?: number; height?: number; quality?: number } = {}
): string {
  if (!src) return '';
  if (!isCloudinaryConfigured()) return src;
  if (src.startsWith('https://res.cloudinary.com')) return src;

  const { width = 900, height, quality = 90 } = opts;
  const t: string[] = ['f_auto', `q_${quality}`];
  if (width) t.push(`w_${width}`);
  if (height) t.push(`h_${height}`);
  t.push('c_limit');

  if (src.startsWith('http')) {
    // Encode the remote URL so query strings (Unsplash, Apple Store, etc.)
    // are not parsed as Cloudinary fetch parameters.
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${t.join(',')}/${encodeURIComponent(src)}`;
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${t.join(',')}/${src}`;
}

/** Use direct URL when Cloudinary proxy fails or is not configured. */
export function productImageUrl(
  src: string,
  opts: { width?: number; height?: number; quality?: number } = {},
  preferDirect = false,
): string {
  if (!src) return '';
  if (preferDirect || !isCloudinaryConfigured()) return src;
  return cloudinaryUrl(src, opts);
}
