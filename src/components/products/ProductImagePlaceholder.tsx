'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function ProductImagePlaceholder({
  bg1,
  bg2,
  isTablet,
  isAudio,
}: {
  bg1: string;
  bg2: string;
  isTablet: boolean;
  isAudio: boolean;
}) {
  const { t } = useLanguage();

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `linear-gradient(135deg, ${bg1}, ${bg2})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {isAudio ? (
        <div style={{ display: 'flex', gap: '16px' }}>
          {[0, 1].map(i => (
            <div key={i} style={{
              width: '28px', height: '52px',
              background: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.4)',
              borderRadius: '14px',
            }} />
          ))}
        </div>
      ) : isTablet ? (
        <div style={{
          width: '110px', height: '140px',
          background: 'rgba(255,255,255,0.12)',
          border: '3px solid rgba(255,255,255,0.4)',
          borderRadius: '10px',
        }} />
      ) : (
        <div style={{
          width: '56px', height: '100px',
          background: 'rgba(255,255,255,0.12)',
          border: '3px solid rgba(255,255,255,0.4)',
          borderRadius: '12px', position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)',
            width: '18px', height: '3px',
            background: 'rgba(255,255,255,0.5)', borderRadius: '9999px',
          }} />
          <div style={{
            position: 'absolute', bottom: '7px', left: '50%', transform: 'translateX(-50%)',
            width: '18px', height: '18px',
            border: '2px solid rgba(255,255,255,0.45)', borderRadius: '50%',
          }} />
        </div>
      )}
      <div style={{
        position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 500,
        whiteSpace: 'nowrap',
      }}>
        {t.common.imageComingSoon}
      </div>
    </div>
  );
}
