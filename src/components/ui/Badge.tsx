import { cn } from '@/lib/utils';
import type { Condition } from '@/types';

interface BadgeProps {
  condition: Condition | string;
  className?: string;
}

const BADGE_MAP: Record<string, { label: string; className: string }> = {
  'brand-new': { label: 'Brand New', className: 'badge-new' },
  'refurbished-grade-a': { label: 'Grade A', className: 'badge-grade-a' },
  'refurbished-grade-b': { label: 'Grade B', className: 'badge-grade-b' },
  'certified-refurbished': { label: 'Certified', className: 'badge-certified' },
};

export function ConditionBadge({ condition, className }: BadgeProps) {
  const config = BADGE_MAP[condition] ?? { label: condition, className: 'badge-grade-a' };
  return (
    <span className={cn('badge', config.className, className)}>
      {config.label}
    </span>
  );
}

interface StockBadgeProps {
  quantity: number;
  className?: string;
}

export function StockBadge({ quantity, className }: StockBadgeProps) {
  if (quantity === 0) return <span className={cn('badge badge-out', className)}>Out of Stock</span>;
  if (quantity <= 20) return <span className={cn('badge badge-low-stock', className)}>{quantity} units</span>;
  return <span className={cn('badge badge-stock', className)}>{quantity}+ units</span>;
}
