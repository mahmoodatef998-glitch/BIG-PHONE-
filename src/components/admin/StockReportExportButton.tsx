'use client';

import { Download } from 'lucide-react';
import type { Collection, Product } from '@/types';
import { exportStockReportCsv } from '@/lib/admin/stock-report';

interface Props {
  products: Product[];
  collections: Collection[];
  label?: string;
  filenamePrefix?: string;
}

export default function StockReportExportButton({
  products,
  collections,
  label,
  filenamePrefix = 'stock-report',
}: Props) {
  const text = label ?? `Export Stock Report (${products.length})`;

  return (
    <button
      type="button"
      onClick={() => exportStockReportCsv(products, collections, filenamePrefix)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        background: '#F8FAFC',
        color: '#374151',
        border: '1px solid #E2E8F0',
        fontSize: '0.8125rem',
        fontWeight: 600,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      <Download size={14} /> {text}
    </button>
  );
}
