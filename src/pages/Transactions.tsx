import { TRANSACTIONS } from '../constants/dummyData';
import { DashboardLayout } from '../components/DashboardLayout';
import { StatusBadge } from '../components/StatusBadge';
import { MoreHorizontal, FileText, Share2, Filter } from 'lucide-react';

export const Transactions = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-1">Transaction History</h1>
            <p className="text-text-secondary font-medium">View and manage all your past and current rental transactions.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-card border border-brand-border rounded-lg text-xs font-bold text-text-secondary hover:bg-white/5 transition-all">
              <Filter size={16} /> Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-lg text-xs font-bold shadow-lg shadow-accent/10 hover:opacity-90 transition-all">
              Export CSV
            </button>
          </div>
        </div>

        <div className="bg-brand-card rounded-xl border border-brand-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-brand-secondary/50">
                  <th className="px-8 py-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-non">Transaction ID</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-non">Vehicle</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-non">Customer</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-non text-center">Date</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-non text-right">Amount</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-non text-center">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-text-secondary uppercase tracking-widest leading-non text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {TRANSACTIONS.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5">
                      <span className="text-xs font-bold text-text-secondary">#{tx.id}</span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-text-primary">{tx.vehicleName}</p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-medium text-text-secondary">{tx.userName}</p>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-xs font-bold text-text-secondary text-center">{new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <p className="text-sm font-black text-text-primary">${tx.amount}</p>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <StatusBadge status={tx.status} className="text-[9px]" />
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-text-secondary hover:text-accent transition-colors">
                          <FileText size={16} />
                        </button>
                        <button className="p-2 text-text-secondary hover:text-accent transition-colors">
                          <Share2 size={16} />
                        </button>
                        <button className="p-2 text-text-secondary hover:text-accent transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-8 py-4 bg-brand-secondary border-t border-brand-border flex items-center justify-between">
            <p className="text-xs text-text-secondary font-bold">Showing 5 of 124 transactions</p>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-brand-border bg-brand-card text-text-secondary disabled:opacity-50" disabled>
                &larr;
              </button>
              <div className="flex gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-accent text-white text-xs font-bold">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-card border border-brand-border text-text-secondary text-xs font-bold">2</button>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-brand-border bg-brand-card text-text-secondary hover:text-accent transition-colors">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
