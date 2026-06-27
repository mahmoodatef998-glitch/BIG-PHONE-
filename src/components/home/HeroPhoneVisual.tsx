'use client';

export default function HeroPhoneVisual() {
  return (
    <>
      <div className="hero-phone-visual" aria-hidden="true">
        <div className="hero-phone-glow" />
        <div className="hero-phone-device">
          <div className="hero-phone-frame">
            <div className="hero-phone-notch" />
            <div className="hero-phone-screen">
              <div className="hero-phone-icon" />
              <div className="hero-phone-line hero-phone-line-lg" />
              <div className="hero-phone-line hero-phone-line-md" />
              <div className="hero-phone-line hero-phone-line-sm" />
            </div>
          </div>
          <div className="hero-phone-shadow" />
        </div>
        <div className="hero-phone-orbit hero-phone-orbit-1" />
        <div className="hero-phone-orbit hero-phone-orbit-2" />
      </div>

      <style>{`
        .hero-phone-visual {
          position: relative;
          width: 100%;
          max-width: 320px;
          aspect-ratio: 1 / 1;
          margin: 0 auto;
          animation: heroFloat 8s ease-in-out infinite;
        }
        .hero-phone-glow {
          position: absolute;
          inset: 10%;
          background: radial-gradient(circle, rgba(255,107,0,0.28) 0%, rgba(255,140,51,0.1) 45%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .hero-phone-device {
          position: relative;
          z-index: 1;
          width: 58%;
          margin: 12% auto 0;
        }
        .hero-phone-frame {
          position: relative;
          padding: 10px;
          border-radius: 36px;
          background: linear-gradient(145deg, #2D2D2D 0%, #111827 55%, #374151 100%);
          box-shadow:
            0 24px 48px rgba(0,0,0,0.22),
            0 8px 24px rgba(255,107,0,0.18),
            inset 0 1px 0 rgba(255,255,255,0.12);
        }
        .hero-phone-notch {
          position: absolute;
          top: 14px;
          left: 50%;
          transform: translateX(-50%);
          width: 28%;
          height: 18px;
          background: #111827;
          border-radius: 0 0 12px 12px;
          z-index: 2;
        }
        .hero-phone-screen {
          position: relative;
          aspect-ratio: 9 / 19.5;
          border-radius: 28px;
          overflow: hidden;
          background: linear-gradient(160deg, #FFF3E8 0%, #FFD0A0 35%, #FF6B00 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 2rem 1.25rem 1.5rem;
        }
        .hero-phone-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.22);
          border: 1.5px solid rgba(255,255,255,0.35);
          margin-bottom: 0.25rem;
        }
        .hero-phone-line {
          height: 8px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.28);
        }
        .hero-phone-line-lg { width: 72%; }
        .hero-phone-line-md { width: 56%; opacity: 0.75; }
        .hero-phone-line-sm { width: 40%; opacity: 0.55; }
        .hero-phone-shadow {
          position: absolute;
          left: 8%;
          right: 8%;
          bottom: -12px;
          height: 18px;
          background: radial-gradient(ellipse, rgba(0,0,0,0.22) 0%, transparent 72%);
        }
        .hero-phone-orbit {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid rgba(255,107,0,0.18);
          pointer-events: none;
        }
        .hero-phone-orbit-1 {
          inset: 4%;
          animation: heroOrbit 12s linear infinite;
        }
        .hero-phone-orbit-2 {
          inset: 14%;
          border-color: rgba(255,107,0,0.1);
          animation: heroOrbit 18s linear infinite reverse;
        }
        @keyframes heroOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (min-width: 900px) {
          .hero-phone-visual { max-width: 360px; }
          .hero-phone-device { width: 62%; }
        }
        @media (min-width: 1200px) {
          .hero-phone-visual { max-width: 400px; }
        }
      `}</style>
    </>
  );
}
