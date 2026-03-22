import { useAuth } from "../hooks/useAuth";

export const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Visão Geral</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-medium text-gray-700">
          Olá, {user?.name}!
        </h2>
        <p className="text-gray-500 mt-2">
          Bem-vindo ao painel de administração da Paróquia Santa Quitéria de
          Brácara.
        </p>
      </div>
    </div>
  );
};
