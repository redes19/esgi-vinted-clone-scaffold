import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Article } from "../types/article";

export function useArticleDetail(id: string) {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => api.get<Article>(`/api/articles/${id}`),
    enabled: !!id, 
  });
}
