import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import apiClient from '@/lib/axios'; // Використовуємо абсолютний імпорт
import { Agent } from '@/features/agents/types'; // Описуємо тип в окремому файлі

// Функції для API-запитів
const getAgents = async (): Promise<Agent[]> => {
  const response = await apiClient.get('/agents');
  return response.data;
};

const getAgentById = async (id: string): Promise<Agent> => {
  const response = await apiClient.get(`/agents/${id}`);
  return response.data;
};

const createAgent = async (newAgent: Omit<Agent, 'id'>): Promise<Agent> => {
  const response = await apiClient.post('/agents/create', newAgent);
  return response.data;
};

const updateAgent = async ({ id, data }: { id: string, data: Partial<Agent> }): Promise<Agent> => {
    const response = await apiClient.patch(`/agents/${id}`, data);
    return response.data;
};

const deleteAgent = async (id: string): Promise<void> => {
    await apiClient.delete(`/agents/${id}`);
};

// Хуки для використання в компонентах
export const useAgents = () => useQuery<Agent[]>({ queryKey: ['agents'], queryFn: getAgents });

export const useAgent = (id: string) => useQuery<Agent>({ queryKey: ['agents', id], queryFn: () => getAgentById(id) });

export const useCreateAgent = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createAgent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
            navigate({ to: '/agents' });
        },
    });
};

export const useUpdateAgent = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: updateAgent,
        onSuccess: (updatedAgent) => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
            queryClient.setQueryData(['agents', updatedAgent.id], updatedAgent);
            navigate({ to: '/agents' });
        },
    });
};

export const useDeleteAgent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAgent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
        },
    });
};
