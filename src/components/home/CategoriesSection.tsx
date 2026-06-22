import Link from 'next/link';
import { Smartphone, Tablet, Laptop, Headphones, Watch, Gamepad2, Music, Package } from 'lucide-react';

const CATS = [
  { label: 'Smartphones',  href: '/inventory?category=smartphone', icon: Smartphone, color: '#6C5CE7', bg: '#F5F3FF' },
  { label: 'Tablets',      href: '/inventory?category=tablet',     icon: Tablet,     color: '#0EA5E9', bg: '#F0F9FF' },
  { label: 'Laptops',      href: '/inventory?category=laptop',     icon: Laptop,     color: '#10B981', bg: '#F0FDF4' },
  { label: 'Earbuds',      href: '/inventory?category=airpods',    icon: Headphones, color: '#F59E0B', bg: '#FFFBEB' },
  { label: 'Smartwatches', href: '/inventory?category=smartwatch', icon: Watch,      color: '#EF4444', bg: '#FFF1F2' },
  { label: 'Gaming',       href: '/inventory?category=gaming',     icon: Gamepad2,   color: '#8B5CF6', bg: '#F5F3FF' },
  { label: 'Audio',        href: '/inventory?category=airpods',    icon: Music,      color: '#EC4899', bg: '#FFF0F7' },
  { label: 'Accessories',  href: '/inventory?category=accessory',  icon: Package,    color: '#64748B', bg: '#F8FAFC' },
];

export default function CategoriesSection() {
  return (
    <section style={{ padding: '3rem 0', background: '#fff' }}>
      <div className="container-site">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            background: '#EDE9FE', borderRadius: '9999px',
            padding: '0.375rem 0.875rem', marginBottom: '0.75rem',
          }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#6C5CE7' }}>Browse by Category</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>
            Shop by Category
          </h2>
          <p style={{ fontSize: '1rem', color: '#6B7280', margin: 0 }}>Find exactly what you&apos;re looking for</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }} className="cat-section-grid">
          {CATS.map(({ label, href, icon: Icon, color, bg }) => (
            <Link
              key={label}
              href={href}
              className="cat-section-card"
              style={{ '--cc': color, '--cc-bg': bg } as React.CSSProperties}
            >
              <div className="cat-section-icon">
                <Icon size={28} color={color} />
              </div>
              <span className="cat-section-label">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px)  { .cat-section-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 481px) and (max-width: 767px) { .cat-section-grid { grid-template-columns: repeat(4, 1fr) !important; } }
        @media (min-width: 768px)  { .cat-section-grid { grid-template-columns: repeat(8, 1fr) !important; } }

        .cat-section-card {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; gap: 0.75rem;
          padding: 1.25rem 0.75rem;
          background: #fff; border: 1.5px solid #EAEAEA;
          border-radius: 16px; text-decoration: none;
          text-align: center; transition: all 0.2s; cursor: pointer;
        }
        .cat-section-card:hover {
          border-color: var(--cc, #6C5CE7);
          box-shadow: 0 4px 20px rgba(108,92,231,0.1);
          transform: translateY(-3px);
          background: var(--cc-bg, #F5F3FF);
        }
        .cat-section-icon {
          width: 60px; height: 60px; border-radius: 14px;
          background: var(--cc-bg, #EDE9FE);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .cat-section-label {
          font-size: 0.8125rem; font-weight: 600; color: #111827; line-height: 1.3;
        }
      `}</style>
    </section>
  );
}
