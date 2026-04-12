import { useCurrentUserId } from "../hooks/useCurrentUserId"
import { api } from '../services/api'
import { useParams } from "react-router";
import { type Article } from '../types/article'
import { useQuery } from "@tanstack/react-query";


export default function MyArticlesPage() {
  const { idUser } = useCurrentUserId();

  const { data, error, isLoading } = useQuery({
    queryKey: ["article", idUser],
    queryFn: async () => const res = await api.get<Article[]>("/api/users/" + idUser + "/articles"),
      enabled: !!idUser

    });


  return (
    <>
      <h1>Mes annonces</h1>
    </>
  );
}
