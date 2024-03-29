import { useMutation } from "react-query";
import http from "infrastructure/utilities/http";
import { CategoryJoin } from "domain/entities/CategoryJoin";

export const useCategoryJoinCreation = () =>
  useMutation({
    mutationFn: async (params: CategoryJoin) => {
      const response = await http.post(`/api/v1/category_joins`, {
        body: JSON.stringify({ ...params }),
      });
      const result = await response.json();
      if (response.ok) {
        return result;
      }
      return Promise.reject(result);
    },
  });

export const useCategoryJoinUpdate = () =>
  useMutation({
    mutationFn: async (params: CategoryJoin) => {
      const response = await http.put(
        `/api/v1/category_joins/${params.todo_id}`,
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

export const useCategoryJoinDelete = () =>
  useMutation({
    mutationFn: async (params: CategoryJoin) => {
      const response = await http.delete(
        `/api/v1/category_joins/${params.todo_id}`,
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
