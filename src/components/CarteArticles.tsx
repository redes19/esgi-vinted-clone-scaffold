import { Link } from "react-router-dom";
import { type Article, CATEGORIES, CONDITIONS } from "../types/article";
import Button from "./Button";

interface ArticleCardProps {
  data: Article[];
  onDelete?: (id: string) => void;
}

const CONDITION_BADGE_CLASS: Record<string, string> = {
  neuf_avec_etiquette: "bg-green-50 text-green-700",
  neuf_sans_etiquette: "bg-green-50 text-green-700",
  tres_bon_etat: "bg-amber-50 text-amber-700",
  bon_etat: "bg-amber-50 text-amber-700",
  satisfaisant: "bg-red-50 text-red-700",
};

const CarteArticles = ({ data, onDelete }: ArticleCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data &&
        data.map((article) => (
          <div
            key={article.id}
            className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:-translate-y-1 transition-transform duration-150 flex flex-col"
          >
            <Link
              to={`/articles/${article.id}`}
              className="flex flex-col flex-1"
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
                    {CATEGORIES.find((c) => c.id === article.category)?.label ??
                      article.category}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      CONDITION_BADGE_CLASS[article.condition] ??
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {CONDITIONS.find((c) => c.value === article.condition)
                      ?.label ?? article.condition}
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
            </Link>

            {onDelete && (
              <div className="absolute top-2 right-2 z-10">
                <Button
                  text="🗑"
                  onClick={() => onDelete(article.id)}
                  variant="danger"
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default CarteArticles;
