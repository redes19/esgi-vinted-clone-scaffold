import { Link } from "react-router-dom";
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
    if (!window.confirm("Supprimer cette annonce ?")) return;
    deleteArticleMutation.mutate(id);
  };

  if (!idUser) return null;

  return (
    <>
      <h1>Mes annonces</h1>

      {error && <div>Une erreur est survenue</div>}

      {isLoading && <p>Chargement…</p>}

      {data && data.length === 0 && (
        <p>
          Vous n'avez pas encore publié d'annonce.{" "}
          <Link to="/publish" className="text-teal-700 hover:underline">
            Publier une annonce
          </Link>
        </p>
      )}

      {data && data.length > 0 && (
        <CarteArticles data={data} onDelete={handleDeleteArticle} />
      )}
    </>
  );
}
