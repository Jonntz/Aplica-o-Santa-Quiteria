/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edit2, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
    useDeleteUser as deleteUserHook,
    useGetUsers,
} from "../../hooks/useUsers"; // Aqui criamos um alias ou você usa o useDeleteUser que fizemos no passo 1

export const UsersListPage = () => {
  const { user: currentUser } = useAuth();
  const { data: users, isLoading } = useGetUsers();
  const { mutate: deleteUser } = deleteUserHook();

  const handleDelete = (id: string) => {
    if (id === currentUser?.id) {
      alert("Você não pode deletar a si mesmo!");
      return;
    }
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      deleteUser(id);
    }
  };

  if (isLoading) return <p className="p-4">Carregando usuários...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-paroquia-primary">
          Gerenciar Usuários
        </h1>
        <Link
          to="/usuarios/novo"
          className="bg-paroquia-gold text-paroquia-dark font-bold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-500 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Novo Usuário
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                E-mail
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Nível
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((u: any) => (
              <tr key={u.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {u.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {u.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-bold rounded-full ${
                      u.role === "ADMIN"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-3">
                  <Link
                    to={`/usuarios/${u.id}/editar`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit2 size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="text-red-600 hover:text-red-900 disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={u.id === currentUser?.id}
                    title={
                      u.id === currentUser?.id
                        ? "Você não pode deletar sua própria conta"
                        : "Deletar usuário"
                    }
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
