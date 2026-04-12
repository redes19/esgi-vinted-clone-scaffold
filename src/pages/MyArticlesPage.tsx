import { useCurrentUserId } from "../hooks/useCurrentUserId"
import { api } from '../services/api'
import { type Article } from '../types/article'
import { useQuery } from "@tanstack/react-query";


export default function MyArticlesPage() {
  const idUser = useCurrentUserId();

  const { data, error, isLoading } = useQuery({
    queryKey: ["article", idUser],
    queryFn: async () => await api.get<Article[]>("/api/users/" + idUser + "/articles"),
      enabled: !!idUser
  });

  console.log("id : ", idUser);


  if(!idUser) return null;

  return (
    <>
      <h1>Mes annonces</h1>

      {error && (
        <div>Une erreur est survenue</div>
      )}

      {isLoading && (
        <div>Loadind...</div>
      )}

    </>
  );
}
