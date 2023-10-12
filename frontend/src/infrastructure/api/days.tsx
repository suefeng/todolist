import { useQuery } from "react-query";
import http from "infrastructure/utilities/http";

export const useDays = () => {
  return useQuery({
    queryKey: ["days"],
    queryFn: () => http.get(`/api/v1/days`).then((response) => response.json()),
  });
};
