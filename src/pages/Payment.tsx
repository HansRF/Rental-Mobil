import { useState } from 'react';
import { DashboardLayout } from '../components/DashboardLayout';
import { 
  CreditCard, 
  Upload, 
  ArrowRight, 
  CheckCircle2, 
  Wallet,
  Building,
  Info
} from 'lucide-react';
import { Button } from '../components/Button';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const Payment = () => {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('bank');
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/transactions');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-1">Finalize Payment</h1>
          <p className="text-text-secondary font-medium">Secure your booking by completing the transaction.</p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-between px-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-brand-border -translate-y-1/2 z-0"></div>
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
                step >= s ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20' : 'bg-brand-primary border-brand-border text-text-secondary'
              }`}
            >
              {step > s ? <CheckCircle2 size={18} /> : s}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button 
                  onClick={() => setSelectedMethod('bank')}
                  className={`p-8 rounded-xl border-2 transition-all flex flex-col items-center text-center gap-4 ${
                    selectedMethod === 'bank' ? 'border-accent bg-accent-glow' : 'border-brand-border bg-brand-card hover:border-text-secondary'
                  }`}
                >
                  <div className={`p-4 rounded-xl ${selectedMethod === 'bank' ? 'bg-accent text-white' : 'bg-brand-primary text-text-secondary border border-brand-border'}`}>
                    <Building size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Bank Transfer</h3>
                    <p className="text-sm text-text-secondary">Traditional offline transfer</p>
                  </div>
                </button>

                <button 
                  onClick={() => setSelectedMethod('card')}
                  className={`p-8 rounded-xl border-2 transition-all flex flex-col items-center text-center gap-4 ${
                    selectedMethod === 'card' ? 'border-accent bg-accent-glow' : 'border-brand-border bg-brand-card hover:border-text-secondary'
                  }`}
                >
                  <div className={`p-4 rounded-xl ${selectedMethod === 'card' ? 'bg-accent text-white' : 'bg-brand-primary text-text-secondary border border-brand-border'}`}>
                    <CreditCard size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">Credit Card</h3>
                    <p className="text-sm text-text-secondary">Instant online processing</p>
                  </div>
                </button>
              </div>

              <div className="bg-brand-card p-8 rounded-xl border border-brand-border">
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-brand-border">
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Order Summary</p>
                  <span className="bg-accent/10 border border-accent/20 text-accent px-3 py-1 rounded-full text-[10px] font-bold">#ORD-552</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Land Rover Defender (3 Days)</span>
                    <span className="font-bold text-text-primary">$750.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Insurance (Premium)</span>
                    <span className="font-bold text-text-primary">$45.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Handling Fee</span>
                    <span className="font-bold text-text-primary">$12.00</span>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-brand-border flex justify-between items-center">
                  <p className="text-lg font-bold text-text-primary">Grand Total</p>
                  <p className="text-3xl font-black text-accent">$807.00</p>
                </div>
              </div>

              <Button onClick={handleNext} className="w-full py-4 text-lg">
                Continue to Payment <ArrowRight size={20} className="ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-brand-card p-8 rounded-xl border border-brand-border shadow-sm space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">Transfer Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-brand-primary border border-brand-border rounded-xl overflow-hidden">
                      <p className="text-[10px] text-text-secondary font-bold uppercase mb-1 tracking-widest">Bank Name</p>
                      <p className="text-sm font-bold text-text-primary truncate">International Commercial Bank</p>
                    </div>
                    <div className="p-4 bg-brand-primary border border-brand-border rounded-xl overflow-hidden">
                      <p className="text-[10px] text-text-secondary font-bold uppercase mb-1 tracking-widest">Account Number</p>
                      <p className="text-sm font-bold text-text-primary truncate">0844 5511 2299 001</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">Upload Proof of Payment</h3>
                  <div className="border-2 border-dashed border-brand-border rounded-xl p-12 flex flex-col items-center justify-center gap-4 hover:border-accent hover:bg-white/5 transition-all cursor-pointer group">
                    <div className="p-4 bg-brand-primary border border-brand-border rounded-xl text-text-secondary group-hover:bg-accent group-hover:text-white transition-all">
                      <Upload size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-text-primary mb-1">Click or drag to upload</p>
                      <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">PDF, JPG, PNG (Max. 5MB)</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-xl border border-accent/10">
                  <Info size={18} className="text-accent shrink-0" />
                  <p className="text-[11px] text-text-secondary font-medium leading-relaxed">
                    Our team will verify your payment within 15-30 minutes during working hours. Your booking status will be updated immediately after verification.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 py-4">Back</Button>
                <Button onClick={handleNext} className="flex-[2] py-4">Submit Payment</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-12 space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent blur-3xl rounded-full opacity-20 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-accent rounded-full flex items-center justify-center text-white shadow-2xl shadow-accent/40">
                  <CheckCircle2 size={48} />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Payment Submitted!</h2>
                <p className="text-text-secondary font-medium max-w-sm mx-auto">
                  Thank you for your trust. We are currently verifying your payment. Check your email for further instructions.
                </p>
              </div>
              <Button onClick={() => navigate('/transactions')} className="px-12 py-4">View My Bookings</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};
