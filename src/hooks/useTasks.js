import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "../services/api";

export const useTasks = () => {

    const queryClient = useQueryClient();

    const deleteTask = useMutation({
        mutationFn: async (taskId) => {
            const response = await api.delete(`/tasks/${taskId}`);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    })

    const createTask = useMutation({
        mutationFn: async (newTask) => {
            const response = await api.post("/tasks", newTask);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    })

    const updateTask = useMutation({
        mutationFn: async ({ id, column }) => {
            const response = await api.patch(`/tasks/${id}`, {
                column,
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });

    return {
        deleteTask: deleteTask.mutate,
        createTask: createTask.mutate,
        updateTask: updateTask.mutate,
    }
}