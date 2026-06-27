'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cloudinaryUrl } from '@/lib/cloudinary';
import { useLanguage } from '@/contexts/LanguageContext';

type Props = {
  images: string[];
  alt: string;
  fallback?: React.ReactNode;
};

export default function ProductImageGallery({ images, alt, fallback }: Props) {
  const { t } = useLanguage();
  const slides = images.filter(Boolean);
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(0);

  const count = slides.length;
  const hasMultiple = count > 1;
  const activeIndex = count > 0 ? ((index % count) + count) % count : 0;

  const goTo = useCallback((next: number) => {
    if (count <= 1) return;
    setIndex((next + count) % count);
  }, [count]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!hasMultiple) return;
    if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
    if (e.key === 'ArrowRight') goTo(activeIndex + 1);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!hasMultiple) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return;
    goTo(diff > 0 ? activeIndex + 1 : activeIndex - 1);
  };

  if (count === 0) {
    return (
      <div className="product-gallery">
        <div className="product-gallery-stage">
          {fallback ?? (
            <div className="product-gallery-empty">No image available</div>
          )}
        </div>
      </div>
    );
  }

  const mainSrc = cloudinaryUrl(slides[activeIndex], { width: 900, quality: 85 });

  return (
    <div className="product-gallery">
      <div
        className="product-gallery-stage"
        tabIndex={hasMultiple ? 0 : undefined}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          key={slides[activeIndex]}
          src={mainSrc}
          alt={`${alt}${hasMultiple ? ` — image ${activeIndex + 1} of ${count}` : ''}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={activeIndex === 0}
          className="product-gallery-image"
        />

        {hasMultiple && (
          <>
            <button
              type="button"
              className="product-gallery-nav product-gallery-nav-prev"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              className="product-gallery-nav product-gallery-nav-next"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next image"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
            <span className="product-gallery-counter">
              {activeIndex + 1} / {count}
            </span>
          </>
        )}
      </div>

      {hasMultiple && (
        <>
          <div className="product-gallery-dots" role="tablist" aria-label="Product images">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Show image ${i + 1}`}
                className={`product-gallery-dot${i === activeIndex ? ' product-gallery-dot-active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <div className="product-gallery-thumbs">
            {slides.map((src, i) => {
              const thumbSrc = cloudinaryUrl(src, { width: 120, quality: 75 });
              return (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  aria-label={`View image ${i + 1}`}
                  aria-current={i === activeIndex ? 'true' : undefined}
                  className={`product-gallery-thumb${i === activeIndex ? ' product-gallery-thumb-active' : ''}`}
                  onClick={() => setIndex(i)}
                >
                  <Image
                    src={thumbSrc}
                    alt=""
                    fill
                    sizes="72px"
                    className="product-gallery-thumb-img"
                  />
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
