import { useMemo } from "react";
import { Link } from "react-router-dom";
import CarteArticles from "../components/CarteArticles";
import { useFavorites, useToggleFavorite } from "../hooks/useFavorites";

export default function FavoritesPage() {
  const { data, isLoading, isError, error } = useFavorites();
  const toggleFavorite = useToggleFavorite();

  // Optimize favoriteIds computation by caching it instead of recomputing it on every render
  const favoriteIds = useMemo(
    () => new Set(data?.map((a) => a.id) ?? []),
    [data],
  );

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Mes favoris</h1>

      {isLoading && <p>Chargement…</p>}

      {isError && (
        <p role="alert" className="text-red-700">
          Une erreur est survenue : {error.message}
        </p>
      )}

      {data && data.length === 0 && (
        <p className="text-gray-500">
          Vous n'avez aucun favori pour le moment.{" "}
          <Link to="/" className="text-teal-700 hover:underline">
            Découvrir le catalogue
          </Link>
        </p>
      )}

      {data && data.length > 0 && (
        <CarteArticles
          data={data}
          favoriteIds={favoriteIds}
          onToggleFavorite={(articleId, isFavorited) =>
            toggleFavorite.mutate({ articleId, isFavorited })
          }
        />
      )}
    </>
  );
}
