import { Link, Navigate, useParams } from "react-router-dom";
import { useArticleDetail } from "../hooks/useArticleDetail";
import { useCurrentUserId } from "../hooks/useCurrentUserId";
import EditArticleForm from "../components/EditArticleForm";

export default function EditArticlePage() {
  const { id } = useParams();
  const currentUserId = useCurrentUserId();
  const { data: article, isLoading, isError } = useArticleDetail(id!);

  if (!id) return <Navigate to="/" replace />;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <p className="text-center text-gray-600">Chargement de l'annonce...</p>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <p className="text-center text-red-600">
          Erreur lors du chargement de l'article
        </p>
      </div>
    );
  }

  if (article.userId !== currentUserId) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md text-center space-y-4">
          <h1 className="text-xl font-bold text-gray-900">Accès refusé</h1>
          <p className="text-gray-700">
            Vous ne pouvez modifier que vos propres annonces.
          </p>
          <Link
            to={`/articles/${id}`}
            className="inline-block text-teal-700 hover:underline"
          >
            ← Retour à l'annonce
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-lg mx-auto">
        <Link
          to={`/articles/${id}`}
          className="inline-block mb-4 text-sm text-teal-700 hover:underline"
        >
          ← Retour à l'annonce
        </Link>

        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Modifier l'annonce
        </h1>

        <EditArticleForm
          articleId={id}
          initialValues={{
            title: article.title,
            description: article.description,
            price: article.price,
            category: article.category,
            size: article.size,
            condition: article.condition,
            imageUrl: article.imageUrl,
          }}
        />
      </div>
    </div>
  );
}
