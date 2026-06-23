import { motion } from 'motion/react';
import { 
  Users, 
  Car, 
  Wallet, 
  Clock, 
  TrendingUp, 
  ArrowUpRight,
  MoreVertical
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { SALES_DATA, TRANSACTIONS } from '../constants/dummyData';
import { StatusBadge } from '../components/StatusBadge';
import { DashboardLayout } from '../components/DashboardLayout';

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-1">Overview Dashboard</h1>
            <p className="text-text-secondary font-medium">Welcome back, Alex. Here's what's happening today.</p>
          </div>
          <button className="flex items-center gap-2 bg-brand-card border border-brand-border px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-white/5 transition-all text-text-primary">
            Download Report <TrendingUp size={16} className="text-accent" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Vehicles" value="6" change={12} icon={Car} trend="up" />
          <StatCard title="Active Bookings" value="43" change={5} icon={Clock} trend="up" />
          <StatCard title="Total Revenue" value="$45,210" change={18} icon={Wallet} trend="up" />
          <StatCard title="New Customers" value="89" change={-2} icon={Users} trend="down" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 bg-brand-card p-8 rounded-xl border border-brand-border shadow-sm"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold text-text-primary">Revenue Analytics</h3>
                <p className="text-xs text-text-secondary font-medium uppercase tracking-wider">Monthly revenue growth report</p>
              </div>
              <select className="bg-brand-primary border border-brand-border text-xs font-bold p-2 px-3 rounded-lg focus:ring-0 text-text-primary">
                <option>Monthly</option>
                <option>Weekly</option>
              </select>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_DATA}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#238636" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#238636" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#30363d" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: '#7d8590' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: '#7d8590' }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#161b22', borderRadius: '12px', border: '1px solid #30363d', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', color: '#e6edf3' }}
                    itemStyle={{ color: '#e6edf3' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#238636" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-brand-card p-8 rounded-xl border border-brand-border shadow-sm"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-text-primary">Recent Bookings</h3>
              <button className="text-xs font-bold text-accent hover:underline">View All</button>
            </div>
            
            <div className="space-y-6">
              {TRANSACTIONS.slice(0, 5).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-primary border border-brand-border rounded-lg flex items-center justify-center text-text-secondary">
                      <Car size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary">{tx.vehicleName}</p>
                      <p className="text-[10px] text-text-secondary font-medium uppercase">{tx.userName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-text-primary">${tx.amount}</p>
                    <StatusBadge status={tx.status} className="text-[8px]" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-brand-border flex items-center justify-between">
              <div>
                <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest mb-1">Service Hours</p>
                <p className="text-sm font-bold text-text-primary uppercase">24/7 Available</p>
              </div>
              <button className="p-2 border border-brand-border rounded-lg hover:bg-white/5 transition-colors text-text-secondary hover:text-text-primary">
                <MoreVertical size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};
