import { useCurrentUserId } from "../hooks/useCurrentUserId";
import { api } from "../services/api";
import { type Article } from "../types/article";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CarteArticles from "../components/CarteArticles";

export default function MyArticlesPage() {
  const idUser = useCurrentUserId();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["article", idUser],
    queryFn: async () =>
      await api.get<Article[]>("/api/users/" + idUser + "/articles"),
    enabled: !!idUser,
  });

  const deleteArticleMutation = useMutation({
    mutationFn: async (articleId: string) => {
      await api.delete<Article[]>("/api/articles/" + articleId);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["article"] });
    },
  });

  const handleDeleteArticle = (id: string) => {
    console.log("id article : ", id);
    deleteArticleMutation.mutate(id);
  };

  console.log("id : ", idUser);

  if (!idUser) return null;

  return (
    <>
      <h1>Mes annonces</h1>

      {error && <div>Une erreur est survenue</div>}

      {isLoading && <div>Loadind...</div>}

      <CarteArticles
        data={data || []}
        onDelete={(id) => handleDeleteArticle(id)}
      ></CarteArticles>
    </>
  );
}
