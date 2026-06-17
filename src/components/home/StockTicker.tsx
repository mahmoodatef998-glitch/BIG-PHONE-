const TICKER_ITEMS = [
  { model: 'iPhone 16 Pro Max 256GB', qty: 85,   tag: 'BRAND NEW',  },
  { model: 'Samsung Galaxy S25 Ultra', qty: 65,   tag: 'BRAND NEW',  },
  { model: 'iPhone 15 Pro 128GB',      qty: 230,  tag: 'GRADE A',    },
  { model: 'Apple AirPods Pro 2',      qty: 250,  tag: 'BRAND NEW',  },
  { model: 'iPad Pro 12.9" M4',        qty: 30,   tag: 'BRAND NEW',  },
  { model: 'Galaxy Tab S9 Ultra',      qty: 40,   tag: 'BRAND NEW',  },
  { model: 'iPhone 13 Pro 256GB',      qty: 320,  tag: 'GRADE A',    },
  { model: 'Samsung Galaxy A54 5G',    qty: 380,  tag: 'BRAND NEW',  },
  { model: 'Galaxy Buds2 Pro',         qty: 180,  tag: 'BRAND NEW',  },
  { model: '65W GaN Charger ×10',      qty: 1000, tag: 'BULK',       },
  { model: 'iPhone 14 256GB',          qty: 190,  tag: 'CERTIFIED',  },
  { model: 'Screen Protectors ×50',    qty: 5000, tag: 'BULK',       },
  { model: 'iPad Air 5 M1',            qty: 55,   tag: 'BRAND NEW',  },
  { model: 'Xiaomi 14 Ultra 512GB',    qty: 45,   tag: 'BRAND NEW',  },
  { model: 'iPhone 15 128GB',          qty: 200,  tag: 'BRAND NEW',  },
];

function qtyColor(qty: number) {
  if (qty >= 200) return '#4ADE80';
  if (qty >= 50)  return '#FBBF24';
  return '#F87171';
}

export default function StockTicker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      role="marquee"
      aria-label="Live wholesale inventory levels"
      style={{
        background: '#070F1C',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
        position: 'relative',
        height: '42px',
      }}
    >
      {/* Left label */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, zIndex: 2,
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        background: 'linear-gradient(to right, #070F1C 72%, transparent 100%)',
        paddingLeft: '1.25rem',
        paddingRight: '2.5rem',
        pointerEvents: 'none',
      }}>
        <span className="ticker-dot" />
        <span style={{
          fontSize: '0.625rem', fontWeight: 800,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.12em', whiteSpace: 'nowrap',
          textTransform: 'uppercase',
        }}>
          Live Stock
        </span>
        <span style={{
          width: '1px', height: '14px',
          background: 'rgba(255,255,255,0.12)',
          flexShrink: 0,
          marginLeft: '0.25rem',
        }} />
      </div>

      {/* Right fade */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 2,
        width: '48px',
        background: 'linear-gradient(to left, #070F1C, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Scrolling track */}
      <div style={{ paddingLeft: '160px', height: '100%', display: 'flex', alignItems: 'center' }}>
        <div className="ticker-track" style={{ display: 'flex', alignItems: 'center', width: 'max-content' }}>
          {doubled.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0 1.5rem',
                borderLeft: '1px solid rgba(255,255,255,0.07)',
                flexShrink: 0,
              }}
            >
              <span style={{
                fontSize: '0.8125rem', fontWeight: 500,
                color: 'rgba(255,255,255,0.75)',
                whiteSpace: 'nowrap',
              }}>
                {item.model}
              </span>
              <span style={{
                fontSize: '0.875rem', fontWeight: 800,
                color: qtyColor(item.qty),
                fontVariantNumeric: 'tabular-nums',
              }}>
                {item.qty >= 1000
                  ? `${(item.qty / 1000).toFixed(1)}K`
                  : item.qty}
              </span>
              <span style={{
                fontSize: '0.5625rem', fontWeight: 700,
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .ticker-track {
          animation: ticker-scroll 55s linear infinite;
        }
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4ADE80;
          animation: pulse-green 2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes pulse-green {
          0%, 100% { opacity: 1;   transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.8); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
          .ticker-dot   { animation: none; }
        }
      `}</style>
    </div>
  );
}
