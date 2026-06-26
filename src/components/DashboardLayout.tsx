import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Search, Bell } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: LayoutProps) => {

  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      setDateTime(
        now.toLocaleString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-brand-primary flex">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        <header className="h-16 bg-brand-secondary border-b border-brand-border flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center bg-brand-card border border-brand-border px-3 py-1.5 rounded-lg w-96 transition-all focus-within:border-accent">
            <Search size={18} className="text-text-secondary mr-2" />
            <input
              type="text"
              placeholder="Search fleet..."
              className="bg-transparent border-none text-sm text-text-primary focus:outline-none w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-text-secondary hover:bg-white/5 rounded-lg relative transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-brand-secondary"></span>
            </button>

            <div className="h-8 w-[1px] bg-brand-border"></div>

            <p className="text-sm font-medium text-text-secondary">
              {dateTime}
            </p>
          </div>
        </header>

        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};