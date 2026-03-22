/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteEvent, useGetEvents } from "../../hooks/useEvents";

export const EventsListPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetEvents(page, 10);
  const { mutate: deleteEvent } = useDeleteEvent();

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja deletar este evento?")) {
      deleteEvent(id);
    }
  };

  if (isLoading) return <p className="p-4">Carregando eventos...</p>;

  const events = data?.data || [];
  const meta = data?.meta;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Eventos e Avisos</h1>
        <Link
          to="/eventos/novo"
          className="bg-paroquia-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-800 transition-colors"
        >
          <Plus size={20} />
          Novo Evento
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  Nenhum evento cadastrado.
                </td>
              </tr>
            )}
            {events.map((event: any) => (
              <tr key={event.id}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {event.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {new Date(event.date).toLocaleDateString("pt-BR")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${event.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                  >
                    {event.published ? "Publicado" : "Rascunho"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-3">
                  <Link
                    to={`/eventos/${event.id}/editar`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit2 size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginação Básica */}
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 bg-gray-50">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="text-sm text-gray-600 disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-sm text-gray-600">
            Página {page} de {meta?.totalPages || 1}
          </span>
          <button
            disabled={page === meta?.totalPages || !meta?.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="text-sm text-gray-600 disabled:opacity-50"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};
