import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    useCreateEvent,
    useGetEventById,
    useUpdateEvent,
} from "../../hooks/useEvents";

// Definindo a interface para tipagem forte do formulário
interface EventFormData {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  category: string;
  published: boolean;
}

// 1. COMPONENTE PAI (Lida com o roteamento e a busca dos dados)
export const EventFormPage = () => {
  const { id } = useParams();
  const isEditing = !!id;

  const { data: eventData, isLoading: isLoadingEvent } = useGetEventById(id);

  if (isEditing && isLoadingEvent) return <p>Carregando dados do evento...</p>;

  // Preparamos os dados INICIAIS antes mesmo do formulário ser montado
  const initialData: EventFormData =
    isEditing && eventData
      ? {
          title: eventData.title,
          description: eventData.description,
          date: new Date(eventData.date).toISOString().slice(0, 16),
          imageUrl: eventData.imageUrl || "",
          category: eventData.category || "",
          published: eventData.published,
        }
      : {
          title: "",
          description: "",
          date: "",
          imageUrl: "",
          category: "",
          published: false,
        };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? "Editar Evento" : "Novo Evento"}
      </h1>

      {/* A prop `key` é a mágica aqui. 
        Quando eventData?.id carregar, o React vai destruir o form vazio e recriar um novo form com os dados populados, sem precisar de useEffect! 
      */}
      <EventForm
        key={eventData?.id || "new"}
        initialData={initialData}
        isEditing={isEditing}
        eventId={id}
      />
    </div>
  );
};

// 2. COMPONENTE FILHO (Lida exclusivamente com o estado e a UI do formulário)
const EventForm = ({
  initialData,
  isEditing,
  eventId,
}: {
  initialData: EventFormData;
  isEditing: boolean;
  eventId?: string;
}) => {
  const navigate = useNavigate();
  const { mutateAsync: createEvent, isPending: isCreating } = useCreateEvent();
  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent();

  // Inicializamos o estado direto com os dados recebidos. Sem useEffect!
  const [formData, setFormData] = useState<EventFormData>(initialData);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Converte a data do input de volta para ISO (UTC)
      const payload = {
        ...formData,
        date: new Date(formData.date).toISOString(),
      };

      if (isEditing && eventId) {
        await updateEvent({ id: eventId, data: payload });
      } else {
        await createEvent(payload);
      }
      navigate("/eventos"); // Volta pra lista após salvar
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Título *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-paroquia-primary focus:ring-paroquia-primary border p-2 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descrição *
        </label>
        <textarea
          required
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-paroquia-primary focus:ring-paroquia-primary border p-2 outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Data e Hora *
          </label>
          <input
            type="datetime-local"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-paroquia-primary focus:ring-paroquia-primary border p-2 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categoria
          </label>
          <input
            type="text"
            placeholder="Ex: Aviso, Festa, Sacramento"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-paroquia-primary focus:ring-paroquia-primary border p-2 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          URL da Imagem
        </label>
        <input
          type="url"
          placeholder="https://..."
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-paroquia-primary focus:ring-paroquia-primary border p-2 outline-none"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) =>
            setFormData({ ...formData, published: e.target.checked })
          }
          className="h-4 w-4 text-paroquia-primary focus:ring-paroquia-primary border-gray-300 rounded"
        />
        <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
          Publicar imediatamente (ficará visível no site)
        </label>
      </div>

      <div className="pt-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/eventos")}
          className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className="px-4 py-2 bg-paroquia-primary text-white rounded-md hover:bg-purple-800 disabled:opacity-50 transition-colors"
        >
          {isCreating || isUpdating ? "Salvando..." : "Salvar Evento"}
        </button>
      </div>
    </form>
  );
};
