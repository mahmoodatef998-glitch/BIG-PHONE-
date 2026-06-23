import Link from 'next/link';
import { Smartphone, Tablet, Laptop, Headphones, Watch, Gamepad2, Music, Package } from 'lucide-react';

const CATS = [
  { label: 'Smartphones',  href: '/inventory?category=smartphone', icon: Smartphone, color: '#FF6B00', bg: '#FFF3E8' },
  { label: 'Tablets',      href: '/inventory?category=tablet',     icon: Tablet,     color: '#3B82F6', bg: '#EFF6FF' },
  { label: 'Laptops',      href: '/inventory?category=laptop',     icon: Laptop,     color: '#10B981', bg: '#ECFDF5' },
  { label: 'Earbuds',      href: '/inventory?category=airpods',    icon: Headphones, color: '#F59E0B', bg: '#FFFBEB' },
  { label: 'Smartwatches', href: '/inventory?category=smartwatch', icon: Watch,      color: '#EF4444', bg: '#FEF2F2' },
  { label: 'Gaming',       href: '/inventory?category=gaming',     icon: Gamepad2,   color: '#8B5CF6', bg: '#F5F3FF' },
  { label: 'Audio',        href: '/inventory?category=audio',      icon: Music,      color: '#EC4899', bg: '#FDF2F8' },
  { label: 'Accessories',  href: '/inventory?category=accessory',  icon: Package,    color: '#64748B', bg: '#F8FAFC' },
];

export default function CategoriesSection() {
  return (
    <section className="section section-bg">
      <div className="container-site">
        <div className="section-header">
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#FF6B00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.375rem' }}>Shop by Category</p>
            <h2 className="section-title">Top Categories</h2>
          </div>
          <Link href="/inventory" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#FF6B00', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}>
            View All →
          </Link>
        </div>

        <div className="cat-scroll">
          {CATS.map(({ label, href, icon: Icon, color, bg }) => (
            <Link
              key={label}
              href={href}
              className="cat-card"
              style={{ '--cc': color, '--cc-bg': bg } as React.CSSProperties}
            >
              <div className="cat-icon" style={{ background: bg }}>
                <Icon size={26} color={color} />
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#111827', textAlign: 'center', display: 'block' }}>
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .cat-scroll {
          display: flex; gap: 0.75rem;
          overflow-x: auto; padding-bottom: 0.5rem; scrollbar-width: none;
        }
        .cat-scroll::-webkit-scrollbar { display: none; }
        @media (min-width: 640px) {
          .cat-scroll { display: grid; grid-template-columns: repeat(4, 1fr); overflow-x: unset; gap: 1rem; }
        }
        @media (min-width: 1024px) { .cat-scroll { grid-template-columns: repeat(8, 1fr); } }
        .cat-card {
          flex-shrink: 0; min-width: 110px;
          display: flex; flex-direction: column; align-items: center;
          padding: 1.25rem 0.875rem 1rem;
          background: #fff; border-radius: 1rem; border: 1.5px solid #EAEAEA;
          text-decoration: none; transition: all 0.18s; cursor: pointer; gap: 0.75rem;
        }
        .cat-card:hover {
          border-color: var(--cc, #FF6B00);
          box-shadow: 0 6px 20px rgba(255,107,0,0.10);
          transform: translateY(-3px);
          background: var(--cc-bg, #FFF3E8);
        }
        .cat-icon {
          width: 56px; height: 56px; border-radius: 1rem;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s;
        }
        .cat-card:hover .cat-icon { transform: scale(1.1); }
      `}</style>
    </section>
  );
}
