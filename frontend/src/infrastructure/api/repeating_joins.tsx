import { useMutation } from 'react-query';
import http from "infrastructure/utilities/http";

export const useRepeatingJoinCreation = () =>
  useMutation({
    mutationFn: async params => {
      const response = await http.post(`/api/v1/repeating_joins`, {
        body: JSON.stringify({ ...params }),
      });
      const result = await response.json();
      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });

export const useRepeatingJoinUpdate = () =>
  useMutation({
    mutationFn: async params => {
      const response = await http.put(`/api/v1/repeating_joins/${params.todo_id}`, {
        body: JSON.stringify({ ...params }),
      });
      const result = await response.json();

      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });