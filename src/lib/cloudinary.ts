const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? '';

export function cloudinaryUrl(
  src: string,
  opts: { width?: number; height?: number; quality?: number } = {}
): string {
  if (!src) return '';
  // Not configured yet — return original
  if (!CLOUD_NAME) return src;
  // Already a full Cloudinary URL
  if (src.startsWith('https://res.cloudinary.com')) return src;
  // External URL (not a public_id)
  if (src.startsWith('http')) return src;

  // It's a Cloudinary public_id — build transformation URL
  const { width = 600, height, quality = 80 } = opts;
  const t: string[] = ['f_auto', `q_${quality}`];
  if (width)  t.push(`w_${width}`);
  if (height) t.push(`h_${height}`);
  t.push('c_limit');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${t.join(',')}/${src}`;
}
