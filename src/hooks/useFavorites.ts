import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Article } from "../types/article";

type ToggleFavoriteVariables = {
  articleId: string;
  isFavorited: boolean;
};

export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => api.get<Article[]>("/api/favorites"),
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, ToggleFavoriteVariables>({
    mutationFn: ({ articleId, isFavorited }) =>
      isFavorited
        ? api.delete<{ message: string }>(`/api/favorites/${articleId}`)
        : api.post<{ message: string }>(`/api/favorites/${articleId}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
