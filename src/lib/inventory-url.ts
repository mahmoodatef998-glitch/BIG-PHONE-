/** Build inventory query params while preserving unrelated filters. */
export function mergeInventoryParams(
  current: URLSearchParams | string,
  updates: Record<string, string | null | undefined>,
): URLSearchParams {
  const params = new URLSearchParams(typeof current === 'string' ? current : current.toString());

  for (const [key, value] of Object.entries(updates)) {
    if (value) params.set(key, value);
    else params.delete(key);
  }

  params.delete('page');
  return params;
}

export function inventoryHref(
  current: URLSearchParams | string,
  updates: Record<string, string | null | undefined>,
): string {
  const params = mergeInventoryParams(current, updates);
  const qs = params.toString();
  return qs ? `/inventory?${qs}` : '/inventory';
}
