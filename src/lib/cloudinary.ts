const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';

export function cloudinaryUrl(
  src: string,
  opts: { width?: number; height?: number; quality?: number } = {}
): string {
  if (!src) return '';
  if (!CLOUD_NAME) return src;
  if (src.startsWith('https://res.cloudinary.com')) return src;

  const { width = 600, height, quality = 80 } = opts;
  const t: string[] = ['f_auto', `q_${quality}`];
  if (width) t.push(`w_${width}`);
  if (height) t.push(`h_${height}`);
  t.push('c_limit');

  if (src.startsWith('http')) {
    // Proxy external URLs through Cloudinary fetch so Samsung/GitHub CDNs
    // are fetched by Cloudinary's servers, not blocked by Vercel IPs.
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${t.join(',')}/${src}`;
  }

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${t.join(',')}/${src}`;
}
