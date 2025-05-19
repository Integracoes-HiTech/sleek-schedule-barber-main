import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Layout,
  Calendar,
  Users,
  Scissors,
  BarChart2,
  User,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types";

interface SidebarProps {
  role: UserRole;
}

interface NavItem {
  title: string;
  icon: React.ElementType;
  href: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { title: "Dashboard", icon: Layout, href: "/admin/dashboard", roles: ["admin"] },
  { title: "Serviços", icon: Scissors, href: "/admin/services", roles: ["admin"] },
  { title: "Profissionais", icon: Users, href: "/admin/professionals", roles: ["admin"] },
  { title: "Relatórios", icon: BarChart2, href: "/admin/reports", roles: ["admin"] },
  { title: "Agenda", icon: Calendar, href: "/professional/schedule", roles: ["professional"] },
  { title: "Agendar", icon: Calendar, href: "/client/booking", roles: ["client"] },
  { title: "Minhas Reservas", icon: Calendar, href: "/client/appointments", roles: ["client"] },
  { title: "Histórico", icon: BarChart2, href: "/client/history", roles: ["client"] }
];

export default function ResponsiveNavigation({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <header className="fixed top-0 left-0 w-full bg-barber-900 text-white shadow z-40 flex items-center justify-between px-4 py-3">
          <span className="text-barber-gold font-bold text-lg">SUA LOGO</span>
          <Button variant="ghost" size="icon" onClick={() => navigate('/professional/profile')}>
            <User />
          </Button>
        </header>

        <div className="h-14" />

        <nav className="fixed bottom-0 left-0 right-0 bg-barber-900 border-t border-barber-800 text-white flex justify-around items-center h-16 z-40">
          {navItems
            .filter((item) => item.roles.includes(role))
            .slice(0, 4)
            .map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <button
                  key={item.href}
                  onClick={() => navigate(item.href)}
                  className={cn(
                    "flex flex-col items-center text-xs",
                    isActive ? "text-barber-gold" : "text-gray-300 hover:text-white"
                  )}
                >
                  <item.icon size={20} />
                  <span className="text-xs mt-1">{item.title}</span>
                </button>
              );
            })}

          <button
            onClick={handleLogout}
            className="flex flex-col items-center text-gray-300 hover:text-white text-xs"
          >
            <LogOut size={20} />
            <span className="text-xs mt-1">Sair</span>
          </button>
        </nav>

        <div className="h-16" />
      </div>

      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden md:flex md:flex-col bg-barber-900 text-white h-screen transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-barber-800">
          {!collapsed && (
            <span className="text-barber-gold font-serif text-lg font-bold">SUA LOGO</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:text-barber-gold"
          >
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </Button>
        </div>

        <nav className="flex flex-col flex-1 py-6 px-3">
          {navItems.filter(item => item.roles.includes(role)).map(item => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md mb-1 transition-colors",
                location.pathname === item.href
                  ? "bg-barber-800 text-barber-gold"
                  : "hover:bg-barber-800 text-gray-300 hover:text-white"
              )}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-barber-800 flex flex-col gap-2">
         
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-300 hover:bg-barber-800 hover:text-white transition-colors w-full"
          >
            <LogOut size={20} />
            {!collapsed && <span>Sair</span>}
          </button>
          <button
            onClick={() => navigate("/professional/profile")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-300 hover:bg-barber-800 hover:text-white transition-colors w-full"
          >
            <User size={20} />
            {!collapsed && <span>Perfil</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
