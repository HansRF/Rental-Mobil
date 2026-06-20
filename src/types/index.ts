export interface Vehicle {
  id: string;
  name: string;
  type: 'MPV' | 'Motorcycle' | 'SUV' | 'Luxury';
  price: number;
  status: 'Available' | 'Rented' | 'Maintenance';
  image: string;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuel: string;
  rating: number;
  description: string;
}
export type UserRole =
  | 'Admin'
  | 'Petugas'
  | 'Pelanggan';
  
export interface Transaction {
  id: string;
  vehicleId: string;
  vehicleName: string;
  userName: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Canceled';
}

export interface StatCardData {
  title: string;
  value: string;
  change: number;
  icon: string;
}
export interface Booking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  customerName: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status:
    | 'Pending'
    | 'Confirmed'
    | 'Paid'
    | 'Completed'
    | 'Canceled';
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: string;
  proof: string;
  status:
    | 'Pending'
    | 'Verified'
    | 'Rejected';
}