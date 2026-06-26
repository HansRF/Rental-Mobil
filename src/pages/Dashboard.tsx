import { useEffect, useState } from "react";
import { Car, Wallet, Clock, Users } from "lucide-react";
import { StatCard } from "../components/StatCard";
import { DashboardLayout } from "../components/DashboardLayout";
import { StatusBadge } from "../components/StatusBadge";
import { supabase } from "../lib/supabase";

import {
  getVehiclesCount,
  getTransactions,
  getRevenue,
} from "../services/dashboardService";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export const Dashboard = () => {
  const [vehicleCount, setVehicleCount] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [revenue, setRevenue] = useState(0);

  const [analyticsType, setAnalyticsType] = useState<
  "day" | "week" | "month"
>("day");

  const fetchDashboard = async () => {
    const [v, t, r] = await Promise.all([
      getVehiclesCount(),
      getTransactions(),
      getRevenue(),
    ]);

    setVehicleCount(v);
    setTransactions(t);
    setRevenue(r);
  };

  useEffect(() => {
    fetchDashboard();

    // 🔥 REALTIME SUPABASE LISTENER
    const channel = supabase
      .channel("dashboard-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "transactions" },
        () => {
          fetchDashboard();
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "vehicles" },
        () => {
          fetchDashboard();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // chart grouping (REAL ANALYTICS)
  const chartData = transactions.reduce((acc: any[], tx: any) => {
    const date = new Date(tx.created_at);

    let label = "";

    if (analyticsType === "day") {
      label = date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
      });
    }

    if (analyticsType === "week") {
      const week = Math.ceil(date.getDate() / 7);
      label = `Minggu ${week}`;
    }

    if (analyticsType === "month") {
      label = date.toLocaleString("id-ID", {
        month: "short",
      });
    }

    const found = acc.find((x) => x.name === label);

    if (found) {
      found.sales += tx.amount;
    } else {
      acc.push({
        name: label,
        sales: tx.amount,
      });
    }

    return acc;
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Vehicles" value={vehicleCount} icon={Car} />
          <StatCard title="Transactions" value={transactions.length} icon={Clock} />
          <StatCard title="Revenue" value={`Rp ${revenue}`} icon={Wallet} />
          <StatCard
            title="Customers"
            value={transactions.length}
            icon={Users}
          />
        </div>

        {/* CHART */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setAnalyticsType("day")}
            className={`px-4 py-2 rounded-lg ${
              analyticsType === "day"
                ? "bg-accent text-white"
                : "bg-brand-primary"
            }`}
          >
            Harian
          </button>

          <button
            onClick={() => setAnalyticsType("week")}
            className={`px-4 py-2 rounded-lg ${
              analyticsType === "week"
                ? "bg-accent text-white"
                : "bg-brand-primary"
            }`}
          >
            Mingguan
          </button>

          <button
            onClick={() => setAnalyticsType("month")}
            className={`px-4 py-2 rounded-lg ${
              analyticsType === "month"
                ? "bg-accent text-white"
                : "bg-brand-primary"
            }`}
          >
            Bulanan
          </button>
        </div>
        <div className="bg-brand-card p-6 rounded-xl">
          <h3 className="font-bold mb-4">
            Revenue Analytics ({analyticsType})
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="sales"
                stroke="#238636"
                fill="#23863633"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* TRANSAKSI */}
        <div className="bg-brand-card p-6 rounded-xl">
          <h3 className="font-bold mb-4">Recent Transactions</h3>

          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex justify-between">
                <div>
                  <p className="font-bold">{tx.vehicle_name}</p>
                  <p className="text-xs text-gray-400">{tx.user_name}</p>
                </div>

                <div className="text-right">
                  <p>Rp {tx.amount}</p>
                  <StatusBadge status={tx.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
