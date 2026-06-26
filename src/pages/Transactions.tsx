import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { DashboardLayout } from "../components/DashboardLayout";
import { StatusBadge } from "../components/StatusBadge";
import { Filter, CheckCircle, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

type Transaction = {
  id: string;
  vehicle_id: string;
  vehicle_name?: string;
  user_name: string;
  amount: number;
  status: "ongoing" | "done";
  created_at: string;
};

export const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  // ========================
  // FETCH TRANSACTIONS
  // ========================
  const fetchTransactions = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setTransactions(data || []);
    }

    setLoading(false);
  };

  // ========================
  // MARK AS DONE (CORE LOGIC)
  // ========================
  const markAsDone = async (tx: Transaction) => {
    const result = await Swal.fire({
      title: "Konfirmasi Pengembalian",
      text: `Apakah kendaraan ${tx.vehicle_name} sudah dikembalikan?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Selesaikan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      background: "#161b22",
      color: "#ffffff",
    });

    if (!result.isConfirmed) return;

    try {
      // Update transaksi
      await supabase
        .from("transactions")
        .update({
          status: "done",
        })
        .eq("id", tx.id);

      // Update kendaraan
      await supabase
        .from("vehicles")
        .update({
          status: "Available",
        })
        .eq("id", tx.vehicle_id);

      await Swal.fire({
        title: "Berhasil!",
        text: "Transaksi berhasil diselesaikan.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        background: "#161b22",
        color: "#ffffff",
      });

      fetchTransactions();
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Gagal",
        text: "Terjadi kesalahan saat memperbarui data.",
        icon: "error",
        confirmButtonColor: "#dc2626",
        background: "#161b22",
        color: "#ffffff",
      });
    }
  };

  const deleteTransaction = async (tx: Transaction) => {
    const result = await Swal.fire({
      title: "Hapus Transaksi?",
      text: `Transaksi ${tx.vehicle_name} akan dihapus permanen.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      background: "#161b22",
      color: "#ffffff",
    });

    if (!result.isConfirmed) return;

    try {
      await supabase.from("transactions").delete().eq("id", tx.id);

      await Swal.fire({
        title: "Berhasil!",
        text: "Transaksi berhasil dihapus.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "#161b22",
        color: "#ffffff",
      });

      fetchTransactions();
    } catch (error) {
      Swal.fire({
        title: "Gagal",
        text: "Tidak dapat menghapus transaksi.",
        icon: "error",
        background: "#161b22",
        color: "#ffffff",
      });
    }
  };
  useEffect(() => {
    fetchTransactions();

    // realtime listener
    const channel = supabase
      .channel("transactions-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "transactions" },
        () => {
          fetchTransactions();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">
              Transactions (Manual Log)
            </h1>
            <p className="text-text-secondary">
              Riwayat penyewaan kendaraan & status pengembalian.
            </p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-brand-card border border-brand-border rounded-lg text-sm text-text-secondary">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-brand-card border border-brand-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-brand-primary">
              <tr className="text-left text-xs text-text-secondary">
                <th className="p-4">ID</th>
                <th>Vehicle</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx, index) => (
                <tr
                  key={tx.id}
                  className="border-t border-brand-border hover:bg-white/5"
                >
                  <td className="p-4 text-sm text-text-secondary">
                    {index + 1}
                  </td>
                  <td className="p-4 font-semibold text-text-primary">
                    {tx.vehicle_name || "-"}
                  </td>

                  <td className="p-4 text-text-secondary">{tx.user_name}</td>

                  <td className="p-4 font-bold text-text-primary">
                    Rp {tx.amount.toLocaleString("id-ID")}
                  </td>

                  <td className="p-4">
                    <StatusBadge status={tx.status} />
                  </td>

                  {/* ACTION */}
                  <td className="p-4">
                    <div className="flex gap-2">
                      {tx.status === "ongoing" && (
                        <button
                          onClick={() => markAsDone(tx)}
                          className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                        >
                          <CheckCircle size={16} />
                          Selesai
                        </button>
                      )}

                      <button
                        onClick={() => deleteTransaction(tx)}
                        className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {transactions.length === 0 && (
            <div className="p-10 text-center text-text-secondary">
              Belum ada transaksi.
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
