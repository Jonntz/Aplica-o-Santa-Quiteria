import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import type { Event } from '../types/index';
import toast from 'react-hot-toast';

// --- BUSCAS (Queries) ---
export const useGetEvents = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['events', page, limit],
    queryFn: async () => {
      const { data } = await api.get(`/events?page=${page}&limit=${limit}`);
      return data; // Retorna { data: Event[], meta: { total, totalPages } }
    },
  });
};

export const useGetEventById = (id?: string) => {
  return useQuery({
    queryKey: ['events', id],
    queryFn: async () => {
      const { data } = await api.get(`/events/${id}`);
      return data as Event;
    },
    enabled: !!id, // Só busca se o ID existir
  });
};

// --- MUTAÇÕES (Criação, Atualização, Exclusão) ---
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventData: Partial<Event>) => {
      const { data } = await api.post('/events', eventData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Evento criado com sucesso!');
    },
    onError: () => toast.error('Erro ao criar evento.'),
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Event> }) => {
      const response = await api.put(`/events/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Evento atualizado com sucesso!');
    },
    onError: () => toast.error('Erro ao atualizar evento.'),
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success('Evento deletado com sucesso!');
    },
    onError: () => toast.error('Erro ao deletar evento.'),
  });
};