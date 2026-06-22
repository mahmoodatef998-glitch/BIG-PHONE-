import Link from 'next/link';

const CATEGORIES = [
  { label: 'Smartphones',   href: '/inventory?category=smartphone',  emoji: '📱', count: '5,000+', color: '#6C5CE7', bg: '#F0EEFF' },
  { label: 'Tablets',       href: '/inventory?category=tablet',       emoji: '💻', count: '800+',   color: '#3B82F6', bg: '#EFF6FF' },
  { label: 'Accessories',   href: '/inventory?category=accessory',    emoji: '🎧', count: '2,000+', color: '#10B981', bg: '#ECFDF5' },
  { label: 'Laptops',       href: '/inventory?category=laptop',       emoji: '💻', count: '400+',   color: '#F59E0B', bg: '#FFFBEB' },
  { label: 'Smart Watches', href: '/inventory?category=watch',        emoji: '⌚', count: '300+',   color: '#EF4444', bg: '#FEF2F2' },
  { label: 'Audio',         href: '/inventory?category=audio',        emoji: '🔊', count: '600+',   color: '#8B5CF6', bg: '#F5F3FF' },
  { label: 'Gaming',        href: '/inventory?category=gaming',       emoji: '🎮', count: '200+',   color: '#EC4899', bg: '#FDF2F8' },
  { label: 'Networking',    href: '/inventory?category=networking',   emoji: '📡', count: '150+',   color: '#14B8A6', bg: '#F0FDFA' },
];

export default function CategoriesSection() {
  return (
    <section className="section section-bg">
      <div className="container-site">
        <div className="section-header">
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#6C5CE7', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>Shop by Category</p>
            <h2 className="section-title">Top Categories</h2>
          </div>
          <Link href="/inventory" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6C5CE7', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}>
            View All →
          </Link>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="cat-scroll">
          {CATEGORIES.map(cat => (
            <Link key={cat.href} href={cat.href} className="cat-card">
              <div style={{
                width: '56px', height: '56px',
                background: cat.bg,
                borderRadius: '1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: '0.75rem',
                transition: 'transform 0.2s',
              }} className="cat-icon">
                {cat.emoji}
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', textAlign: 'center', display: 'block' }}>
                {cat.label}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem', display: 'block', textAlign: 'center' }}>
                {cat.count} products
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .cat-scroll {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          scrollbar-width: none;
        }
        .cat-scroll::-webkit-scrollbar { display: none; }

        @media (min-width: 640px) {
          .cat-scroll {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            overflow-x: unset;
            gap: 1rem;
          }
        }
        @media (min-width: 1024px) {
          .cat-scroll { grid-template-columns: repeat(8, 1fr); }
        }

        .cat-card {
          flex-shrink: 0;
          min-width: 110px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.25rem 0.875rem 1rem;
          background: #fff;
          border-radius: 1rem;
          border: 1.5px solid #EAEAEA;
          text-decoration: none;
          transition: all 0.18s;
          cursor: pointer;
        }
        .cat-card:hover {
          border-color: #C4BBFF;
          box-shadow: 0 6px 20px rgba(108,92,231,0.12);
          transform: translateY(-3px);
        }
        .cat-card:hover .cat-icon { transform: scale(1.1); }
      `}</style>
    </section>
  );
}
