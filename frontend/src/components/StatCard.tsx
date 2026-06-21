import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  trend?: 'up' | 'down';
}

export const StatCard = ({ title, value, change, icon: Icon, trend }: StatCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-brand-card p-6 rounded-xl border border-brand-border shadow-sm hover:border-accent/50 transition-all duration-300 group"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-text-secondary text-xs font-bold uppercase tracking-wider">{title}</h3>
        <p className="text-2xl font-bold text-text-primary">{value}</p>
        {change !== undefined && (
          <span className={cn(
            "text-xs font-bold",
            change >= 0 ? "text-accent" : "text-red-500"
          )}>
            {change >= 0 ? '+' : ''}{change}% from last month
          </span>
        )}
      </div>
    </motion.div>
  );
};
