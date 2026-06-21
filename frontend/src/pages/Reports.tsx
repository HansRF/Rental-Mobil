import { DashboardLayout } from '../components/DashboardLayout';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { SALES_DATA } from '../constants/dummyData';
import { motion } from 'motion/react';
import { FileDown, Calendar, Filter } from 'lucide-react';

const CATEGORY_DATA = [
  { name: 'Luxury', value: 400 },
  { name: 'SUV', value: 300 },
  { name: 'Car', value: 300 },
  { name: 'Motorcycle', value: 200 },
];

const COLORS = ['#238636', '#2ea043', '#3fb950', '#216e39'];

export const Reports = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-1">Reports & Analytics</h1>
            <p className="text-text-secondary font-medium">Comprehensive insights into your rental business performance.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-brand-card border border-brand-border rounded-xl text-xs font-bold text-text-secondary">
              <Calendar size={16} /> Last 30 Days
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-xl text-xs font-bold shadow-lg shadow-accent/10">
              <FileDown size={18} /> Export PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Comparison */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-brand-card p-8 rounded-xl border border-brand-border shadow-sm"
          >
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">Revenue Distribution</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span className="text-[10px] font-bold text-text-secondary uppercase">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-brand-primary rounded-full"></div>
                  <span className="text-[10px] font-bold text-text-secondary uppercase">Previous</span>
                </div>
              </div>
            </div>

            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SALES_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#30363d" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#7d8590' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#7d8590' }} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#161b22', borderRadius: '12px', border: '1px solid #30363d', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', color: '#e6edf3' }}
                  />
                  <Bar dataKey="sales" fill="#238636" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Distribution */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-brand-card p-8 rounded-xl border border-brand-border shadow-sm flex flex-col"
          >
            <h3 className="text-xl font-bold text-text-primary mb-2 uppercase tracking-tight">Fleet Mix</h3>
            <p className="text-xs text-text-secondary font-bold mb-8 uppercase tracking-widest">Popularity by vehicle category</p>
            
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CATEGORY_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {CATEGORY_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#161b22', borderRadius: '12px', border: '1px solid #30363d', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', color: '#e6edf3' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full space-y-3 mt-4">
                {CATEGORY_DATA.map((item, idx) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                      <span className="text-xs font-bold text-text-secondary">{item.name}</span>
                    </div>
                    <span className="text-xs font-black text-text-primary">{Math.round((item.value/1200)*100)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Table Section */}
        <div className="bg-brand-card p-12 rounded-xl border border-brand-border text-text-primary overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-[150px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-2">Total Earnings</p>
              <h4 className="text-4xl font-black mb-1">$124,500</h4>
              <p className="text-text-secondary text-[10px] font-bold uppercase">+14% compared to last period</p>
            </div>
            <div>
              <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-2">Average Booking</p>
              <h4 className="text-4xl font-black mb-1 text-white">$580</h4>
              <p className="text-text-secondary text-[10px] font-bold uppercase">Based on 214 successful trips</p>
            </div>
            <div className="flex items-center justify-end">
              <button className="bg-accent text-white px-8 py-4 rounded-xl font-black shadow-xl shadow-accent/20 hover:scale-105 transition-transform uppercase tracking-widest text-xs">
                Generate Full Audit
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
