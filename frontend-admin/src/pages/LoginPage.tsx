/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

export const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      const { accessToken, user } = response.data;

      login(accessToken, user);
      toast.success("Bem-vindo de volta!");
      window.location.href = "/dashboard";
    } catch (error: any) {
      toast.error(
        error.response?.data?.error ||
          "Erro ao fazer login. Verifique suas credenciais.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Painel Paroquial
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Acesso restrito à administração
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border focus:ring-paroquia-primary focus:border-paroquia-primary outline-none transition-colors"
                  placeholder="admin@paroquia.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border focus:ring-paroquia-primary focus:border-paroquia-primary outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-paroquia-primary hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-paroquia-primary disabled:opacity-50 transition-colors"
            >
              {isLoading ? "Entrando..." : "Entrar no Sistema"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
