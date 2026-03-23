import { CalendarDays, Users } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useDashboardStats } from "../hooks/useDashboard";

export const DashboardPage = () => {
  const { user } = useAuth();
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div>
      <h1 className="text-2xl font-bold text-paroquia-primary mb-6">
        Visão Geral
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-medium text-gray-800">
          Olá, {user?.name}!
        </h2>
        <p className="text-gray-500 mt-2">
          Bem-vindo ao painel de administração da Paróquia Santa Quitéria. Seu
          nível de acesso é:{" "}
          <strong className="text-paroquia-gold">{user?.role}</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card de Eventos */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-red-50 text-paroquia-primary rounded-lg">
            <CalendarDays size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
              Eventos Cadastrados
            </p>
            <p className="text-3xl font-bold text-gray-800">
              {isLoading ? "..." : stats?.eventsCount || 0}
            </p>
          </div>
        </div>

        {/* Card de Usuários */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-yellow-50 text-paroquia-gold rounded-lg">
            <Users size={32} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider">
              Usuários no Sistema
            </p>
            <p className="text-3xl font-bold text-gray-800">
              {isLoading ? "..." : stats?.usersCount || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
