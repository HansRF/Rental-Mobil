import { useState } from "react";
import { VEHICLES } from "../constants/dummyData";
import { DashboardLayout } from "../components/DashboardLayout";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

export const VehicleList = () => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const types = ["All", ...new Set(VEHICLES.map((v) => v.type))];

  const filteredVehicles = VEHICLES.filter((v) => {
    const matchesType = filter === "All" || v.type === filter;

    const matchesSearch = v.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-1">
              Manajemen Kendaraan
            </h1>

            <p className="text-text-secondary font-medium">
              Kelola data kendaraan rental mobil.
            </p>
          </div>

          <button className="flex items-center gap-2 px-5 py-3 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition">
            <Plus size={18} />
            Tambah Kendaraan
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            />

            <input
              type="text"
              placeholder="Cari Kendaraan..."
              className="w-full pl-10 pr-4 py-2.5 bg-brand-card border border-brand-border rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap border ${
                filter === type
                  ? "bg-accent text-white border-accent shadow-lg shadow-accent/20"
                  : "bg-brand-card text-text-secondary hover:bg-white/5 border-brand-border"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-brand-card rounded-xl border border-brand-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-border bg-brand-primary">
                <th className="p-4 text-left">ID</th>

                <th className="p-4 text-left">Foto</th>

                <th className="p-4 text-left">Nama_Mobil</th>

                <th className="p-4 text-left">Tipe</th>

                <th className="p-4 text-left">Harga/Hari</th>

                <th className="p-4 text-left">Status</th>

                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredVehicles.map((vehicle) => (
                <tr
                  key={vehicle.id}
                  className="border-b border-brand-border hover:bg-white/5"
                >
                  <td className="p-4">{vehicle.id}</td>

                  <td className="p-4">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                  </td>

                  <td className="p-4 font-semibold">{vehicle.name}</td>

                  <td className="p-4">{vehicle.type}</td>

                  <td className="p-4">
                    Rp {vehicle.price.toLocaleString("id-ID")}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        vehicle.status === "Available"
                          ? "bg-green-500/20 text-green-400"
                          : vehicle.status === "Rented"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2 justify-center">
                      <button className="flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
                        <Trash2 size={16} />
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-12 text-text-secondary">
              Tidak ada kendaraan ditemukan.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
