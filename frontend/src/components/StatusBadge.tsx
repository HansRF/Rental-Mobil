import { cn } from '../lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getColors = () => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'rented':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'maintenance':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'pending':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'canceled':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <span className={cn(
      'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border',
      getColors(),
      className
    )}>
      {status}
    </span>
  );
};
