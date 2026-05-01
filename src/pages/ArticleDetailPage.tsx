import { Link, useParams } from "react-router-dom";
import { useArticleDetail } from "../hooks/useArticleDetail";
import { useCurrentUserId } from "../hooks/useCurrentUserId";
import { useFavorites, useToggleFavorite } from "../hooks/useFavorites";
import { CATEGORIES, CONDITIONS } from "../types/article";

const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export default function ArticleDetailPage() {
  const { id } = useParams();
  const { data: article, isLoading, isError } = useArticleDetail(id!);
  const currentUserId = useCurrentUserId();
  const { data: favorites } = useFavorites();
  const toggleFavorite = useToggleFavorite();

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur lors du chargement</p>;
  if (!article) return <p>Article introuvable</p>;

  const categoryLabel =
    CATEGORIES.find((c) => c.id === article.category)?.label ??
    article.category;
  const conditionLabel =
    CONDITIONS.find((c) => c.value === article.condition)?.label ??
    article.condition;
  const formattedDate = new Date(article.createdAt).toLocaleDateString("fr-FR");

  const isOwnArticle = article.userId === currentUserId;
  const isFavorited = !!favorites?.some((a) => a.id === article.id);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      <Link
        to="/"
        className="inline-block mb-4 text-sm text-teal-700 hover:underline"
      >
        ← Retour au catalogue
      </Link>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Détail de l’article
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full aspect-[3/4] object-cover rounded-lg shadow-sm"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {article.title}
          </h2>

          <p className="text-gray-700">{article.description}</p>

          <p className="text-xl font-bold text-teal-600">
            {priceFormatter.format(article.price)}
          </p>

          {!isOwnArticle && (
            <button
              type="button"
              onClick={() =>
                toggleFavorite.mutate({ articleId: article.id, isFavorited })
              }
              disabled={toggleFavorite.isPending}
              aria-label={
                isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"
              }
              className={`inline-flex items-center gap-2 w-fit px-4 py-2 rounded-xl border text-sm font-medium transition-colors disabled:opacity-50 ${
                isFavorited
                  ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                  : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span
                className={isFavorited ? "text-red-500" : "text-gray-400"}
              >
                {isFavorited ? "♥" : "♡"}
              </span>
              {isFavorited ? "Retirer des favoris" : "Ajouter aux favoris"}
            </button>
          )}

          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-semibold">Catégorie :</span> {categoryLabel}
            </p>
            <p>
              <span className="font-semibold">Taille :</span> {article.size}
            </p>
            <p>
              <span className="font-semibold">État :</span> {conditionLabel}
            </p>
            <p>
              <span className="font-semibold">Posté par :</span>{" "}
              {article.userName}
            </p>
            <p>
              <span className="font-semibold">Publié le :</span> {formattedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
