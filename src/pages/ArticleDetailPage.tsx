import { useArticleDetail } from "../hooks/useArticleDetail";
import { useParams } from "react-router-dom";

export default function ArticleDetailPage() {
  const { id } = useParams();
  const { data: article, isLoading, isError } = useArticleDetail(id!);

  if (isLoading) return <p>Chargement...</p>;
  if (isError) return <p>Erreur lors du chargement</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
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

          <p className="text-xl font-bold text-teal-600">{article.price} €</p>

          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-semibold">Catégorie :</span>{" "}
              {article.category}
            </p>
            <p>
              <span className="font-semibold">Taille :</span> {article.size}
            </p>
            <p>
              <span className="font-semibold">État :</span> {article.condition}
            </p>
            <p>
              <span className="font-semibold">Posté par :</span>{" "}
              {article.userName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
