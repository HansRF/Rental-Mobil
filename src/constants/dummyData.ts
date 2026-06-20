import { Vehicle, Transaction } from '../types';
import avanzaImg from '../assets/Avanza.jpeg';
import sigraImg from '../assets/Sigra.jpeg';

export const VEHICLES: Vehicle[] = [
  {
    id: '1',
    name: 'Toyota Avanza',
    type: 'MPV',
    price: 400000,
    status: 'Available',
    image: avanzaImg,
    seats: 6,
    transmission: 'Automatic',
    fuel: 'Electric',
    rating: 4.9,
    description: 'The Tesla Model 3 is a fully electric four-door compact executive sedan. It offers impressive performance and cutting-edge technology.'
  },
  {
    id: '2',
    name: 'Daihatsu Sigra',
    type: 'MPV',
    price: 350000,
    status: 'Rented',
    image: sigraImg,
    seats: 6,
    transmission: 'Automatic',
    fuel: 'Petrol',
    rating: 5.0,
    description: 'Uncompromising power and precision. The Daihatsu Sigra is the pinnacle of the M series coupes.'
  },
  // {
  //   id: '3',
  //   name: 'Honda CBR1000RR-R',
  //   type: 'Motorcycle',
  //   price: 120,
  //   status: 'Available',
  //   image: 'https://picsum.photos/seed/bike/600/400',
  //   seats: 1,
  //   transmission: 'Manual',
  //   fuel: 'Petrol',
  //   rating: 4.8,
  //   description: 'Built for the track, born for the street. A high-performance superbike for those who demand the ultimate response.'
  // },
  // {
  //   id: '4',
  //   name: 'Land Rover Defender',
  //   type: 'SUV',
  //   price: 250,
  //   status: 'Available',
  //   image: 'https://picsum.photos/seed/defender/600/400',
  //   seats: 7,
  //   transmission: 'Automatic',
  //   fuel: 'Diesel',
  //   rating: 4.7,
  //   description: 'Capable of great things. The Defender 110 is ready for anything, from city streets to rugged terrain.'
  // },
  // {
  //   id: '5',
  //   name: 'Porsche 911 Carrera',
  //   type: 'Luxury',
  //   price: 450,
  //   status: 'Maintenance',
  //   image: 'https://picsum.photos/seed/porsche/600/400',
  //   seats: 2,
  //   transmission: 'Automatic',
  //   fuel: 'Petrol',
  //   rating: 4.9,
  //   description: 'The definitive sports car. Unmatched heritage and performance in a timeless design.'
  // },
  // {
  //   id: '6',
  //   name: 'Toyota Alphard',
  //   type: 'Luxury',
  //   price: 280,
  //   status: 'Available',
  //   image: 'https://picsum.photos/seed/alphard/600/400',
  //   seats: 7,
  //   transmission: 'Automatic',
  //   fuel: 'Hybrid',
  //   rating: 4.6,
  //   description: 'First-class travel for everyone. The Alphard offers luxury and comfort for large groups.'
  // }
];

export const TRANSACTIONS: Transaction[] = [
  { id: 'TX001', vehicleId: '1', vehicleName: 'Tesla Model 3', userName: 'John Doe', date: '2024-03-15', amount: 450, status: 'Completed' },
  { id: 'TX002', vehicleId: '4', vehicleName: 'Land Rover Defender', userName: 'Jane Smith', date: '2024-03-14', amount: 750, status: 'Pending' },
  { id: 'TX003', vehicleId: '3', vehicleName: 'Honda CBR1000RR-R', userName: 'Mike Ross', date: '2024-03-12', amount: 240, status: 'Completed' },
  { id: 'TX004', vehicleId: '2', vehicleName: 'BMW M4 Competition', userName: 'Alice Wong', date: '2024-03-10', amount: 1050, status: 'Canceled' },
  { id: 'TX005', vehicleId: '6', vehicleName: 'Toyota Alphard', userName: 'David Chen', date: '2024-03-08', amount: 560, status: 'Completed' },
];

export const SALES_DATA = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];
