/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useCreateUser,
    useGetUserById,
    useUpdateUser,
} from "../../hooks/useUsers";

export const UserFormPage = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const { data: userData, isLoading } = useGetUserById(id);

  if (isEditing && isLoading) return <p>Carregando dados...</p>;

  const initialData =
    isEditing && userData
      ? {
          name: userData.name,
          email: userData.email,
          password: "", // A senha nunca vem do backend
          role: userData.role,
        }
      : {
          name: "",
          email: "",
          password: "",
          role: "ESCRITOR",
        };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold text-paroquia-primary mb-6">
        {isEditing ? "Editar Usuário" : "Novo Usuário"}
      </h1>
      <UserForm
        key={userData?.id || "new"}
        initialData={initialData}
        isEditing={isEditing}
        userId={id}
      />
    </div>
  );
};

const UserForm = ({ initialData, isEditing, userId }: any) => {
  const navigate = useNavigate();
  const { mutateAsync: createUser, isPending: isCreating } = useCreateUser();
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser();
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Se estiver editando e a senha estiver em branco, remove do payload
      const payload = { ...formData };
      if (isEditing && !payload.password) {
        delete payload.password;
      }

      if (isEditing && userId) {
        await updateUser({ id: userId, data: payload });
      } else {
        await createUser(payload);
      }
      navigate("/usuarios");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Nome Completo *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-paroquia-primary focus:ring-paroquia-primary border p-2 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">
          E-mail *
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-paroquia-primary focus:ring-paroquia-primary border p-2 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">
          {isEditing
            ? "Nova Senha (deixe em branco para manter a atual)"
            : "Senha *"}
        </label>
        <input
          type="password"
          required={!isEditing}
          minLength={6}
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-paroquia-primary focus:ring-paroquia-primary border p-2 outline-none"
          placeholder="Mínimo 6 caracteres"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Nível de Acesso *
        </label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-paroquia-primary focus:ring-paroquia-primary border p-2 outline-none bg-white"
        >
          <option value="ESCRITOR">
            Escritor (Pode apenas gerenciar eventos)
          </option>
          <option value="ADMIN">Administrador (Acesso total)</option>
        </select>
      </div>

      <div className="pt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/usuarios")}
          className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className="px-4 py-2 bg-paroquia-gold text-paroquia-dark font-bold rounded-md hover:bg-yellow-500 disabled:opacity-50 transition-colors"
        >
          {isCreating || isUpdating ? "Salvando..." : "Salvar Usuário"}
        </button>
      </div>
    </form>
  );
};
