import { useMutation, useQuery } from 'react-query';
import http from "infrastructure/utilities/http";

export const useTodos = ({ filter = '', type = '' }: { filter?: string, type?: string }) => {
  const filterParam = filter !== '' ? `?filter=${filter}&type=${type}` : ''

  return useQuery({
    queryKey: ['todos', filter],
    queryFn: () =>
      http.get(`/api/v1/todos${filterParam}`).then(response => response.json()),
  })
};

export const useTodosCreation = () =>
  useMutation({
    mutationFn: async params => {
      const response = await http.post(`/api/v1/todos`, {
        body: JSON.stringify({ ...params }),
      });
      const result = await response.json();
      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });

export const useTodosUpdate = () =>
  useMutation({
    mutationFn: async params => {
      const response = await http.put(`/api/v1/todos/${params.todo_id}`, {
        body: JSON.stringify({ ...params }),
      });
      const result = await response.json();

      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });

export const useTodoShow = (todoId: string) => {
  return useQuery({
    queryKey: ['todos', todoId],
    queryFn: () =>
      http.get(`/api/v1/todos/${todoId}`).then(response => response.json()),
  })
};

export async function useTodosDestroy(todoId: string) {
  await http.delete(`/api/v1/todos/${todoId}`, {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    referrer: 'no-referrer',
  });
}
