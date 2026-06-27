'use client';

import type { CSSProperties } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function AdminPagination({ page, totalPages, total, pageSize, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const btnStyle = (disabled: boolean): CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '0.375rem',
    border: '1px solid #E2E8F0',
    background: disabled ? '#F8FAFC' : '#fff',
    color: disabled ? '#CBD5E1' : '#374151',
    cursor: disabled ? 'not-allowed' : 'pointer',
  });

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '0.75rem',
      flexWrap: 'wrap',
    }}>
      <span style={{ fontSize: '0.8125rem', color: '#6B7280' }}>
        Showing {start}–{end} of {total}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
        <button
          type="button"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          style={btnStyle(page <= 1)}
        >
          <ChevronLeft size={16} />
        </button>
        <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', minWidth: '72px', textAlign: 'center' }}>
          {page} / {totalPages}
        </span>
        <button
          type="button"
          aria-label="Next page"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          style={btnStyle(page >= totalPages)}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
