import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Car,
  History,
  LogOut,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./Button";

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Car, label: "Vehicles", path: "/vehicles" },
  { icon: History, label: "Transactions", path: "/transactions" },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-brand-secondary border-r border-brand-border flex flex-col z-50">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white shadow-lg shadow-accent/20">
            <Car size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase">
            VeloDrive
          </span>
        </div>

        <nav className="space-y-1 font-sans">
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 border-l-3 transition-all duration-200 group",
                  isActive
                    ? "bg-accent-glow text-text-primary border-accent"
                    : "text-text-secondary hover:bg-white/5 border-transparent hover:text-text-primary",
                )}
              >
                <item.icon
                  size={20}
                  className={cn(
                    isActive
                      ? "text-accent"
                      : "text-text-secondary group-hover:text-text-primary",
                  )}
                />
                <span className="text-sm font-semibold">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-8 space-y-4">
        <div className="bg-brand-card p-4 rounded-xl border border-brand-border flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
            <img src="https://picsum.photos/seed/avatar/100" alt="avatar" />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate text-text-primary">
              {user?.first_name || "Guest"}
            </p>

            <p className="text-xs text-text-secondary truncate capitalize">
              {user?.role || "User"}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:bg-red-500/10 hover:text-red-400"
          onClick={handleLogout}
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </Button>
      </div>
    </aside>
  );
};
