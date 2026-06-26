import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export const Booking = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("status", "Available");

    if (!error) {
      setVehicles(data || []);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Vehicles...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-primary p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Available Vehicles</h1>

        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold"
        >
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            className="bg-brand-card rounded-xl border border-brand-border overflow-hidden"
          >
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-52 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl text-white font-bold">{vehicle.name}</h2>

              <p className="text-text-secondary mt-2">{vehicle.type}</p>

              <p className="text-accent font-bold mt-4">
                Rp {vehicle.price}/hari
              </p>

              <button
                onClick={() => {
                  const days =
                    Number(
                      (
                        document.getElementById(
                          `days-${vehicle.id}`,
                        ) as HTMLInputElement
                      )?.value,
                    ) || 1;

                  const total = vehicle.price * days;

                  const message = `
Halo Admin VeloDrive,

Saya ingin melakukan booking kendaraan:

Kendaraan : ${vehicle.name}
Tipe : ${vehicle.type}
Durasi Sewa : Hari
Harga / Hari : Rp ${vehicle.price.toLocaleString("id-ID")}
Total Estimasi : Rp ${total.toLocaleString("id-ID")}

Mohon informasi mengenai ketersediaan kendaraan dan proses pembayaran.

Terima kasih.
`;

                  window.open(
                    `https://wa.me/6285770622526?text=${encodeURIComponent(message)}`,
                    "_blank",
                  );
                }}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 py-3 rounded-lg text-white font-semibold"
              >
                Book via WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
