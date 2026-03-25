import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Eventos e Avisos", path: "/eventos", icon: CalendarDays },
    // Adicionamos a rota de usuários condicionalmente
    ...(user?.role === "ADMIN"
      ? [{ name: "Usuários", path: "/usuarios", icon: Users }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Agora com o gradiente vermelho */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-paroquia-primary to-paroquia-dark shadow-2xl transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="h-16 flex items-center justify-center border-b border-white/10">
          <h1 className="text-xl font-bold text-paroquia-gold font-cinzel">
            Santa Quitéria 2
          </h1>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
                  isActive
                    ? "bg-paroquia-gold text-paroquia-dark font-bold shadow-md"
                    : "text-paroquia-light hover:bg-white/10 hover:text-paroquia-gold"
                }`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-paroquia-primary shadow-sm flex items-center justify-between px-4 lg:px-8 z-10 border-b border-gray-200">
          <button
            className="p-2 rounded-md lg:hidden text-gray-600 hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-4">
            <div className="text-sm text-right hidden sm:block">
              <p className="font-semibold text-paroquia-gold font-cinzel">
                {user?.name}
              </p>
              <p className="text-paroquia-gold text-xs font-montserrat">
                {user?.email}
              </p>
            </div>
            <button
              onClick={logout}
              className="p-2 text-paroquia-gold hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Sair"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-8 bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
