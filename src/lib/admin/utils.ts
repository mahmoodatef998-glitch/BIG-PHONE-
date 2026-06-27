export function timeAgo(dateStr: string): string {
  const d = Date.now() - new Date(dateStr).getTime();
  if (d < 60_000) return 'just now';
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  if (d < 2_592_000_000) return `${Math.floor(d / 86_400_000)}d ago`;
  return new Date(dateStr).toLocaleDateString('en-AE', { month: 'short', day: 'numeric' });
}

export function waLink(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '#';
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function customerInitial(name: string): string {
  const trimmed = name.trim();
  return trimmed ? trimmed[0].toUpperCase() : '?';
}
