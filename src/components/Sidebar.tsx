import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Car,
  History,
  LogOut,
  Menu,
  X,
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false); // auto close di mobile
  };

  return (
    <>
      {/* ===== MOBILE TOP BAR ===== */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-brand-secondary border-b border-brand-border flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-2 text-white font-bold">
          <Car />
          VeloDrive
        </div>

        <button onClick={() => setOpen(true)}>
          <Menu className="text-white" />
        </button>
      </div>

      {/* ===== OVERLAY ===== */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-brand-secondary border-r border-brand-border flex flex-col z-50 transition-transform duration-300",
          "md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* CLOSE BTN (MOBILE) */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X className="text-white" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {/* LOGO */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center text-white">
              <Car size={24} />
            </div>
            <span className="text-xl font-bold text-white uppercase">
              VeloDrive
            </span>
          </div>

          {/* MENU */}
          <nav className="space-y-1">
            {MENU_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 transition-all",
                    isActive
                      ? "bg-accent-glow text-white border-l-4 border-accent"
                      : "text-gray-300 hover:bg-white/5"
                  )}
                >
                  <item.icon size={20} />
                  <span className="text-sm font-semibold">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* USER SECTION */}
        <div className="mt-auto p-6 space-y-4">
          <div className="bg-brand-card p-4 rounded-xl flex items-center gap-3">
            <img
              src="https://picsum.photos/seed/avatar/100"
              className="w-10 h-10 rounded-full"
            />

            <div>
              <p className="text-white text-sm font-bold">
                {user?.first_name || "Guest"}
              </p>
              <p className="text-xs text-gray-400 capitalize">
                {user?.role || "User"}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start text-red-500"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};