'use client';

import { useMemo, useState } from 'react';

export function usePagination<T>(items: T[], pageSize = 20, resetKey = '') {
  const [pageState, setPageState] = useState({ resetKey, page: 1 });

  const page = pageState.resetKey === resetKey ? pageState.page : 1;
  const setPage = (nextPage: number) => setPageState({ resetKey, page: nextPage });

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, safePage, pageSize]);

  return {
    page: safePage,
    setPage,
    totalPages,
    paginated,
    pageSize,
    total: items.length,
    hasMultiplePages: totalPages > 1,
  };
}
