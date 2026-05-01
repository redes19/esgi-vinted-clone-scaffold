import { useEffect, useState } from "react";
import CarteArticles from "../components/CarteArticles";
import {
  type CatalogueSort,
  useCatalogueArticles,
} from "../hooks/useCatalogueArticles";
import { CATEGORIES, CONDITIONS } from "../types/article";

const SORT_OPTIONS: { value: CatalogueSort; label: string }[] = [
  { value: "date_desc", label: "Plus récents" },
  { value: "price_asc", label: "Prix croissant" },
  { value: "price_desc", label: "Prix décroissant" },
];

const FIELD_CLASS =
  "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-600";

export default function CataloguePage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState<CatalogueSort>("date_desc");

  // Debounce search input to avoid making requests on every keystroke
  useEffect(() => {
    const timeout = setTimeout(() => setSearch(searchInput), 300);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data, isLoading, isError, error } = useCatalogueArticles({
    search,
    category,
    condition,
    priceMin,
    priceMax,
    sort,
  });

  const hasFilters =
    !!search || !!category || !!condition || !!priceMin || !!priceMax;

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setCategory("");
    setCondition("");
    setPriceMin("");
    setPriceMax("");
    setSort("date_desc");
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Catalogue</h1>

      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="md:col-span-3 lg:col-span-2">
          <label
            htmlFor="catalogue-search"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Recherche
          </label>
          <input
            id="catalogue-search"
            type="search"
            placeholder="Titre ou description"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label
            htmlFor="catalogue-category"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Catégorie
          </label>
          <select
            id="catalogue-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={FIELD_CLASS}
          >
            <option value="">Toutes</option>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="catalogue-condition"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            État
          </label>
          <select
            id="catalogue-condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className={FIELD_CLASS}
          >
            <option value="">Tous</option>
            {CONDITIONS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="catalogue-price-min"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Prix min (€)
          </label>
          <input
            id="catalogue-price-min"
            type="number"
            min="0"
            step="0.01"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label
            htmlFor="catalogue-price-max"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Prix max (€)
          </label>
          <input
            id="catalogue-price-max"
            type="number"
            min="0"
            step="0.01"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label
            htmlFor="catalogue-sort"
            className="block text-xs font-medium text-gray-500 mb-1"
          >
            Tri
          </label>
          <select
            id="catalogue-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as CatalogueSort)}
            className={FIELD_CLASS}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <div className="md:col-span-3 lg:col-span-6">
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm text-teal-700 hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {isLoading && <p>Chargement…</p>}

      {isError && (
        <p role="alert" className="text-red-700">
          Une erreur est survenue : {error.message}
        </p>
      )}

      {data && data.length === 0 && (
        <p className="text-gray-500">
          Aucun article ne correspond à votre recherche.
        </p>
      )}

      {data && data.length > 0 && <CarteArticles data={data} />}
    </>
  );
}
