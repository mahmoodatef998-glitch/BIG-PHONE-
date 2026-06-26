import type { Product } from '@/types';

function stockColor(qty: number): string {
  if (qty >= 200) return '#4ADE80';
  if (qty >= 50) return '#FBBF24';
  return '#F87171';
}

interface Props {
  products: Product[];
}

export default function LiveStockTicker({ products }: Props) {
  const items = products
    .filter(p => p.stock_quantity > 0)
    .sort((a, b) => b.stock_quantity - a.stock_quantity)
    .slice(0, 24)
    .map(p => ({
      key: p.id,
      label: p.model,
      qty: p.stock_quantity,
      color: stockColor(p.stock_quantity),
    }));

  if (items.length === 0) return null;

  const doubled = [...items, ...items];

  return (
    <div
      className="live-stock-ticker"
      role="marquee"
      aria-label="Live wholesale stock levels"
    >
      <div className="live-stock-ticker-label">
        <span className="live-stock-ticker-dot" aria-hidden="true" />
        LIVE STOCK
      </div>
      <div className="live-stock-ticker-track-wrap">
        <div className="live-stock-ticker-track">
          {doubled.map((item, i) => (
            <span key={`${item.key}-${i}`} className="live-stock-ticker-item">
              <span className="live-stock-ticker-name">{item.label}</span>
              <span className="live-stock-ticker-qty" style={{ color: item.color }}>
                {item.qty.toLocaleString()} units
              </span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .live-stock-ticker {
          display: flex;
          align-items: stretch;
          height: 42px;
          background: #070F1C;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
        }
        .live-stock-ticker-label {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 1rem;
          background: #070F1C;
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #4ADE80;
          text-transform: uppercase;
          border-right: 1px solid rgba(255,255,255,0.08);
          z-index: 2;
        }
        .live-stock-ticker-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ADE80;
          animation: tickerPulse 2s ease-in-out infinite;
        }
        @keyframes tickerPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .live-stock-ticker-track-wrap {
          flex: 1;
          overflow: hidden;
          position: relative;
        }
        .live-stock-ticker-track {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          height: 100%;
          width: max-content;
          padding: 0 1.5rem;
          animation: tickerScroll 55s linear infinite;
        }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .live-stock-ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          white-space: nowrap;
          font-size: 0.8125rem;
        }
        .live-stock-ticker-name {
          color: #8B9DB5;
          font-weight: 500;
        }
        .live-stock-ticker-qty {
          font-weight: 700;
        }
        @media (prefers-reduced-motion: reduce) {
          .live-stock-ticker-track { animation: none; }
          .live-stock-ticker-dot { animation: none; }
        }
      `}</style>
    </div>
  );
}
