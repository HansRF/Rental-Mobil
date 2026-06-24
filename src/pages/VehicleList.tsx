import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Vehicle } from "../types";
import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../services/vehicleService";
import { DashboardLayout } from "../components/DashboardLayout";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";

export const VehicleList = () => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);

  const fetchVehicles = async () => {
    try {
      const data = await getVehicles();
      setVehicles(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchVehicles();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    type: "MPV" as Vehicle["type"],
    price: "",
    status: "Available" as Vehicle["status"],
    image: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // function CRUD taruh di sini

  const types = ["All", ...new Set(vehicles.map((v) => v.type))];
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };

const handleSubmit = async () => {
  try {
    let imageUrl = formData.image;

    if (selectedFile) {
      const fileName = `${Date.now()}-${selectedFile.name}`;

      const { error: uploadError } = await supabase.storage
        .from("vehicles")
        .upload(fileName, selectedFile);

      if (uploadError) {
        console.error(uploadError);
        alert(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("vehicles")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const payload = {
      name: formData.name,
      type: formData.type,
      price: Number(formData.price),
      status: formData.status,
      image: imageUrl,
    };

    console.log("PAYLOAD:", payload);

    if (!payload.name || !payload.type || !payload.price) {
      alert("Data belum lengkap!");
      return;
    }

    if (editingVehicle) {
      await updateVehicle(editingVehicle.id, payload);
    } else {
      await createVehicle(payload);
    }

    await fetchVehicles();

    setShowModal(false);
  } catch (error) {
    console.error("SUBMIT ERROR:", error);
    alert("Gagal menyimpan data!");
  }
};

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);

    setFormData({
      name: vehicle.name,
      type: vehicle.type,
      price: vehicle.price.toString(),
      status: vehicle.status,
      image: vehicle.image,
    });

    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus mobil ini?")) return;

    try {
      await deleteVehicle(id);
      await fetchVehicles();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data!");
    }
  };
  const filteredVehicles = vehicles.filter((v) => {
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
              Manajemen Mobil
            </h1>

            <p className="text-text-secondary font-medium">
              Kelola data kendaraan rental mobil.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingVehicle(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-5 py-3 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
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

        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-brand-card border border-brand-border rounded-2xl w-full max-w-md p-6 shadow-2xl">
              {/* HEADER */}
              <h2 className="text-xl font-bold text-white mb-6">
                {editingVehicle ? "Edit Kendaraan" : "Tambah Kendaraan"}
              </h2>

              <div className="space-y-4">
                {/* NAME */}
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Mobil"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-brand-primary text-white border border-brand-border focus:outline-none focus:ring-2 focus:ring-accent"
                />

                {/* IMAGE */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-3 rounded-lg bg-brand-primary text-white border border-brand-border file:bg-accent file:text-white file:border-0 file:px-3 file:py-1 file:rounded"
                />

                {/* TYPE */}
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-brand-primary text-white border border-brand-border focus:ring-2 focus:ring-accent"
                >
                  <option value="MPV">MPV</option>
                  <option value="SUV">SUV</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Motorcycle">Motorcycle</option>
                </select>

                {/* PRICE */}
                <input
                  type="text"
                  inputMode="numeric"
                  name="price"
                  placeholder="Harga Per Hari"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-brand-primary text-white border border-brand-border focus:ring-2 focus:ring-accent"
                />

                {/* STATUS */}
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-brand-primary text-white border border-brand-border focus:ring-2 focus:ring-accent"
                >
                  <option value="Available">Available</option>
                  <option value="Rented">Rented</option>
                  <option value="Maintenance">Maintenance</option>
                </select>

                {/* BUTTONS */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition"
                  >
                    Batal
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 rounded-lg bg-accent hover:opacity-90 text-white transition shadow-lg shadow-accent/20"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
              {filteredVehicles.map((vehicle, index) => (
                <tr
                  key={vehicle.id}
                  className="border-b border-brand-border hover:bg-white/5"
                >
                  <td className="p-4 font-medium text-text-secondary">
                    {index + 1}
                  </td>

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
                      <button
                        onClick={() => handleEdit(vehicle)}
                        className="flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(vehicle.id)}
                        className="flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                      >
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
