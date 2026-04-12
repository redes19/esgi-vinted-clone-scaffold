import { useCurrentUserId } from "../hooks/useCurrentUserId";
import { api } from "../services/api";
import { type Article } from "../types/article";
import { useQuery } from "@tanstack/react-query";

export default function MyArticlesPage() {
  const idUser = useCurrentUserId();

  const { data, error, isLoading } = useQuery({
    queryKey: ["article", idUser],
    queryFn: async () =>
      await api.get<Article[]>("/api/users/" + idUser + "/articles"),
    enabled: !!idUser,
  });

  console.log("id : ", idUser);

  if (!idUser) return null;

  return (
    <>
      <h1>Mes annonces</h1>

      {error && <div>Une erreur est survenue</div>}

      {isLoading && <div>Loadind...</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data &&
          data.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:-translate-y-1 transition-transform duration-150 cursor-pointer flex flex-col"
            >
              {article.imageUrl ? (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full aspect-[3/4] object-cover"
                />
              ) : (
                <div className="w-full aspect-[3/4] bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-300 text-4xl">📷</span>
                </div>
              )}

              <div className="p-3 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    {article.category}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      article.condition.toLowerCase().includes("neuf")
                        ? "bg-green-50 text-green-700"
                        : article.condition.toLowerCase().includes("bon")
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-700"
                    }`}
                  >
                    {article.condition}
                  </span>
                </div>

                <p className="font-medium text-gray-900 text-sm truncate mb-1">
                  {article.title}
                </p>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed flex-grow">
                  {article.description}
                </p>

                <div className="flex items-center justify-between pt-2 mt-3 border-t border-gray-100">
                  <span className="text-base font-semibold text-gray-900">
                    {article.price} €
                  </span>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                    {article.size}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
