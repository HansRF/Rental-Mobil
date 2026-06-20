import React from 'react';
import { motion } from 'motion/react';
import { Users, Fuel, Gauge, ArrowRight } from 'lucide-react';
import { Vehicle } from '../types';
import { StatusBadge } from './StatusBadge';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-brand-card rounded-xl border border-brand-border overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-primary">
        <img 
          src={vehicle.image} 
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-110 opacity-80 group-hover:opacity-100 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <StatusBadge status={vehicle.status} />
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-base font-bold text-text-primary mb-1">{vehicle.name}</h3>
            <p className="text-xs font-semibold text-text-secondary">{vehicle.type} • {vehicle.seats} Seats</p>
          </div>
          <div className="text-right">
            <p className="text-base font-bold text-accent">${vehicle.price} / day</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            className="flex-1 text-xs"
            onClick={() => navigate(`/vehicles/${vehicle.id}`)}
          >
            Rent Now
          </Button>
          <Button 
            variant="outline"
            className="text-xs"
            onClick={() => navigate(`/vehicles/${vehicle.id}`)}
          >
            Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
