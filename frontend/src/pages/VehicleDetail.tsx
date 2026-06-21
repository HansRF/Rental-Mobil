import { useParams, useNavigate } from 'react-router-dom';
import { VEHICLES } from '../constants/dummyData';
import { DashboardLayout } from '../components/DashboardLayout';
import { 
  ArrowLeft, 
  Users, 
  Fuel, 
  Gauge, 
  Star, 
  ShieldCheck, 
  Clock,
  Calendar,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { motion } from 'motion/react';

export const VehicleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = VEHICLES.find(v => v.id === id);

  if (!vehicle) {
    return <div>Vehicle not found</div>;
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back and Status */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-text-secondary font-bold hover:text-text-primary transition-colors"
          >
            <div className="p-2 rounded-lg bg-brand-card border border-brand-border group-hover:border-accent">
              <ArrowLeft size={18} />
            </div>
            Back to Fleet
          </button>
          <StatusBadge status={vehicle.status} className="scale-110" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left - Hero Image and Info */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video rounded-[32px] overflow-hidden border border-brand-border"
            >
              <img 
                src={vehicle.image} 
                alt={vehicle.name} 
                className="w-full h-full object-cover opacity-90"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-6 bg-brand-card rounded-xl border border-brand-border flex flex-col items-center text-center">
                <Users size={24} className="text-accent mb-2" />
                <p className="text-text-secondary text-[10px] font-bold uppercase mb-1 tracking-widest">Capacity</p>
                <p className="text-lg font-bold text-text-primary">{vehicle.seats} Seats</p>
              </div>
              <div className="p-6 bg-brand-card rounded-xl border border-brand-border flex flex-col items-center text-center">
                <Fuel size={24} className="text-accent mb-2" />
                <p className="text-text-secondary text-[10px] font-bold uppercase mb-1 tracking-widest">Fuel Type</p>
                <p className="text-lg font-bold text-text-primary">{vehicle.fuel}</p>
              </div>
              <div className="p-6 bg-brand-card rounded-xl border border-brand-border flex flex-col items-center text-center">
                <Gauge size={24} className="text-accent mb-2" />
                <p className="text-text-secondary text-[10px] font-bold uppercase mb-1 tracking-widest">Drivetrain</p>
                <p className="text-lg font-bold text-text-primary">{vehicle.transmission}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-text-primary uppercase tracking-tight">Description</h2>
              <p className="text-text-secondary leading-relaxed font-medium">
                {vehicle.description}
                <br /><br />
                Our vehicles are meticulously maintained and detailed before every rental. This {vehicle.name} comes equipped with the latest safety features, premium sound system, and modern navigation capabilities.
              </p>
            </div>
          </div>

          {/* Right - Booking Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-brand-card p-8 rounded-xl border border-brand-border shadow-2xl shadow-black/50 sticky top-24">
              <div className="flex justify-between items-end mb-8 border-b border-brand-border pb-6">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="fill-accent text-accent" />
                    <span className="text-xs font-bold text-text-primary">{vehicle.rating}</span>
                    <span className="text-[10px] text-text-secondary font-medium tracking-widest uppercase">(24 Reviews)</span>
                  </div>
                  <h1 className="text-2xl font-bold text-text-primary tracking-tight">{vehicle.name}</h1>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-accent">${vehicle.price}</p>
                  <p className="text-[10px] text-text-secondary font-bold uppercase tracking-tighter">per day</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="p-5 bg-brand-primary rounded-xl border border-brand-border space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar size={18} className="text-text-secondary" />
                    <div className="flex-1">
                      <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Rental Dates</p>
                      <p className="text-sm font-bold text-text-primary">18 May - 20 May 2026</p>
                    </div>
                  </div>
                  <div className="h-[1px] bg-brand-border"></div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-text-secondary" />
                    <div className="flex-1">
                      <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Insurance</p>
                      <p className="text-sm font-bold text-text-primary">Comprehensive (+ $25)</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 px-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary font-medium">2 Days x ${vehicle.price}</span>
                    <span className="font-bold text-text-primary">${vehicle.price * 2}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary font-medium">Service Fee</span>
                    <span className="font-bold text-text-primary">$15</span>
                  </div>
                  <div className="h-[1px] bg-brand-border my-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-text-primary uppercase tracking-widest text-xs">Total</span>
                    <span className="text-2xl font-black text-white">${vehicle.price * 2 + 15}</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full py-5 text-lg"
                onClick={() => navigate('/payment')}
                disabled={vehicle.status !== 'Available'}
              >
                {vehicle.status === 'Available' ? 'Instant Booking' : 'Not Available'}
              </Button>
            </div>

            <div className="bg-brand-secondary p-6 rounded-xl border border-brand-border text-text-primary flex items-center justify-between group cursor-pointer hover:bg-accent-glow hover:border-accent transition-all">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Expert Help</p>
                  <p className="text-sm font-bold text-text-primary">Chat with Concierge</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
