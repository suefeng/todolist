import { useMutation } from "react-query";
import http from "infrastructure/utilities/http";
import { DayJoin } from "domain/entities/DayJoin";

export const useDayJoinCreation = () =>
  useMutation({
    mutationFn: async (params: DayJoin) => {
      const response = await http.post(`/api/v1/day_joins`, {
        body: JSON.stringify({ ...params }),
      });
      const result = await response.json();
      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });

export const useDayJoinUpdate = () =>
  useMutation({
    mutationFn: async (params: DayJoin) => {
      const response = await http.put(`/api/v1/day_joins/${params.todo_id}`, {
        body: JSON.stringify({ ...params }),
      });
      const result = await response.json();

      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });

export const useDayJoinDelete = () =>
  useMutation({
    mutationFn: async (params: DayJoin) => {
      const response = await http.delete(
        `/api/v1/day_joins/${params.todo_id}`,
        {
          body: JSON.stringify({ ...params }),
        }
      );
      const result = await response.json();

      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });
