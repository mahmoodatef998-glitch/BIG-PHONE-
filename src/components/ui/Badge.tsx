'use client';

import { cn } from '@/lib/utils';
import { conditionLabel } from '@/lib/i18n';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Condition } from '@/types';

interface BadgeProps {
  condition: Condition | string;
  className?: string;
}

const BADGE_CLASS: Record<string, string> = {
  'brand-new': 'badge-new',
  'refurbished-grade-a': 'badge-grade-a',
  'refurbished-grade-b': 'badge-grade-b',
  'certified-refurbished': 'badge-certified',
  'big-deal': 'badge-big-deal',
  'super-sale': 'badge-super-sale',
};

export function ConditionBadge({ condition, className }: BadgeProps) {
  const { t } = useLanguage();
  const label = conditionLabel(condition, t);
  const badgeClass = BADGE_CLASS[condition] ?? 'badge-grade-a';

  return (
    <span className={cn('badge', badgeClass, className)}>
      {label}
    </span>
  );
}

interface StockBadgeProps {
  quantity: number;
  className?: string;
}

export function StockBadge({ quantity, className }: StockBadgeProps) {
  const { t } = useLanguage();

  if (quantity === 0) {
    return <span className={cn('badge badge-out', className)}>{t.product.outOfStock}</span>;
  }
  if (quantity <= 20) {
    return (
      <span className={cn('badge badge-low-stock', className)}>
        {quantity} {t.common.units}
      </span>
    );
  }
  return (
    <span className={cn('badge badge-stock', className)}>
      {quantity}+ {t.common.units}
    </span>
  );
}
