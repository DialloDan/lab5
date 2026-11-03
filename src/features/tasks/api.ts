import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import apiClient from '@/lib/axios'; // Використовуємо абсолютний імпорт
import { Task, TaskDTO } from '@/features/tasks/types'; // Описуємо тип в окремому файлі

// Функції для API-запитів
const getTasks = async (): Promise<TaskDTO[]> => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

const getTaskById = async (id: string): Promise<TaskDTO> => {
  const response = await apiClient.get(`/tasks/${id}`);
  return response.data;
};

const createTask = async (newTask: Omit<Task, 'id'>): Promise<TaskDTO> => {
  const response = await apiClient.post('/tasks/create', newTask);
  return response.data;
};

const updateTask = async ({ id, data }: { id: string, data: Partial<Task> }): Promise<TaskDTO> => {
    const response = await apiClient.patch(`/tasks/${id}`, data);
    return response.data;
};

const deleteTask = async (id: string): Promise<void> => {
    await apiClient.delete(`/tasks/${id}`);
};

// Хуки для використання в компонентах
export const useTasks = () => useQuery<TaskDTO[]>({ queryKey: ['tasks'], queryFn: getTasks });

export const useTask = (id: string) => useQuery<TaskDTO>({ queryKey: ['tasks', id], queryFn: () => getTaskById(id) });

export const useCreateTask = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            navigate({ to: '/tasks' });
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: updateTask,
        onSuccess: (updatedTask) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            queryClient.setQueryData(['tasks', updatedTask.id], updatedTask);
            navigate({ to: '/tasks' });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};
