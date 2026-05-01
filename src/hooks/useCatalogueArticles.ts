import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import type { Article } from "../types/article";

export type CatalogueSort = "date_desc" | "price_asc" | "price_desc";

export type CatalogueFilters = {
  search: string;
  category: string;
  condition: string;
  priceMin: string;
  priceMax: string;
  sort: CatalogueSort;
};

function buildQueryString(filters: CatalogueFilters): string {
  const params = new URLSearchParams();
  if (filters.search.trim()) params.set("search", filters.search.trim());
  if (filters.category) params.set("category", filters.category);
  if (filters.condition) params.set("condition", filters.condition);
  if (filters.priceMin) params.set("priceMin", filters.priceMin);
  if (filters.priceMax) params.set("priceMax", filters.priceMax);
  if (filters.sort !== "date_desc") params.set("sort", filters.sort);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function useCatalogueArticles(filters: CatalogueFilters) {
  return useQuery({
    queryKey: ["article", "catalogue", filters],
    queryFn: () =>
      api.get<Article[]>(`/api/articles${buildQueryString(filters)}`),
    placeholderData: keepPreviousData,
  });
}
