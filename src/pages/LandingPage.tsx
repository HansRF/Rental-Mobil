import { useNavigate } from "react-router-dom";
import {
  Car,
  Shield,
  CreditCard,
  Star,
  ArrowRight,
} from "lucide-react";

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-primary text-white">

      {/* NAVBAR */}
      <nav className="border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Car className="text-accent" size={28} />
            <h1 className="text-2xl font-bold">VeloDrive</h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-lg border border-brand-border hover:bg-white/5"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="px-5 py-2 rounded-lg bg-accent text-white"
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <p className="text-accent uppercase tracking-widest font-bold mb-4">
              Premium Car Rental
            </p>

            <h1 className="text-6xl font-black leading-tight mb-6">
              Drive Your
              <span className="text-accent"> Dream Car </span>
              Today.
            </h1>

            <p className="text-text-secondary text-lg mb-8">
              Explore our premium fleet of luxury and performance
              vehicles. Fast booking, secure payments, and
              unforgettable driving experiences.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/vehicles")}
                className="bg-accent px-6 py-4 rounded-xl font-bold flex items-center gap-2"
              >
                Browse Vehicles
                <ArrowRight size={18} />
              </button>

              <button
                className="border border-brand-border px-6 py-4 rounded-xl"
              >
                Learn More
              </button>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600"
              alt="car"
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-brand-card border border-brand-border rounded-2xl p-8">
            <Car size={40} className="text-accent mb-4" />
            <h3 className="font-bold text-xl mb-2">
              Premium Fleet
            </h3>
            <p className="text-text-secondary">
              Luxury sedans, SUVs, sports cars and premium vehicles.
            </p>
          </div>

          <div className="bg-brand-card border border-brand-border rounded-2xl p-8">
            <CreditCard size={40} className="text-accent mb-4" />
            <h3 className="font-bold text-xl mb-2">
              Easy Payment
            </h3>
            <p className="text-text-secondary">
              Secure payment with QRIS and cash methods.
            </p>
          </div>

          <div className="bg-brand-card border border-brand-border rounded-2xl p-8">
            <Shield size={40} className="text-accent mb-4" />
            <h3 className="font-bold text-xl mb-2">
              Trusted Service
            </h3>
            <p className="text-text-secondary">
              Safe booking experience with verified vehicles.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-brand-card p-6 rounded-xl text-center">
            <div className="text-5xl font-black text-accent mb-4">
              1
            </div>
            <h3 className="font-bold">Choose Vehicle</h3>
          </div>

          <div className="bg-brand-card p-6 rounded-xl text-center">
            <div className="text-5xl font-black text-accent mb-4">
              2
            </div>
            <h3 className="font-bold">Book Online</h3>
          </div>

          <div className="bg-brand-card p-6 rounded-xl text-center">
            <div className="text-5xl font-black text-accent mb-4">
              3
            </div>
            <h3 className="font-bold">Make Payment</h3>
          </div>

          <div className="bg-brand-card p-6 rounded-xl text-center">
            <div className="text-5xl font-black text-accent mb-4">
              4
            </div>
            <h3 className="font-bold">Drive Away</h3>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          Customer Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-brand-card border border-brand-border p-6 rounded-2xl"
            >
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="text-text-secondary mb-4">
                Amazing service, clean vehicles, and very easy booking process.
              </p>

              <h4 className="font-bold">
                Customer {item}
              </h4>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-accent rounded-3xl p-12 text-center">

          <h2 className="text-5xl font-black mb-4">
            Ready To Drive?
          </h2>

          <p className="mb-8 text-lg">
            Book your favorite vehicle today.
          </p>

          <button
            onClick={() => navigate("/vehicles")}
            className="bg-white text-black font-bold px-8 py-4 rounded-xl"
          >
            Explore Vehicles
          </button>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-brand-border mt-12">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <h3 className="font-bold text-xl mb-2">
            VeloDrive
          </h3>

          <p className="text-text-secondary">
            Premium Car Rental Platform © 2026
          </p>
        </div>
      </footer>

    </div>
  );
};