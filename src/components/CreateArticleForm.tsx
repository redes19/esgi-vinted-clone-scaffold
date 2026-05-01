import { useCreateArticleForm } from "../hooks/useCreateArticleForm";
import type { CreateArticleProps } from "../hooks/useCreateArticleForm";
import { CATEGORIES, CONDITIONS } from "../types/article";

interface CreateArticleFormProps {
  initialValues?: CreateArticleProps;
}

const CreateArticleForm = ({ initialValues }: CreateArticleFormProps = {}) => {
  const { register, handleSubmit, onSubmit, isPending, isError, error, errors } =
    useCreateArticleForm(initialValues);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md space-y-5"
    >
      <div className="flex flex-col space-y-1">
        <label
          htmlFor="article-title"
          className="text-sm font-medium text-gray-700"
        >
          Titre
        </label>
        <input
          id="article-title"
          {...register("title", {
            required: "Le titre est obligatoire",
            minLength: { value: 3, message: "Minimum 3 caractères" },
            maxLength: { value: 100, message: "Maximum 100 caractères" },
          })}
          placeholder="Titre de l'article"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        {errors.title && (
          <p className="text-red-600 text-xs">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="article-description"
          className="text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="article-description"
          {...register("description", {
            required: "La description est obligatoire",
            minLength: {
              value: 10,
              message: "La description doit au moins contenir 10 caractères",
            },
            maxLength: {
              value: 1000,
              message: "La description ne peut dépasser 1000 caractères",
            },
          })}
          placeholder="Décris ton article"
          className="border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        {errors.description && (
          <p className="text-red-600 text-xs">{errors.description.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="article-price"
          className="text-sm font-medium text-gray-700"
        >
          Prix (€)
        </label>
        <input
          id="article-price"
          type="number"
          step="0.01"
          {...register("price", {
            valueAsNumber: true,
            required: "Le prix est obligatoire",
            min: { value: 0.1, message: "La valeur doit être supérieure à 0" },
          })}
          placeholder="Prix"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        {errors.price && (
          <p className="text-red-600 text-xs">{errors.price.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="article-category"
          className="text-sm font-medium text-gray-700"
        >
          Catégorie
        </label>
        <select
          id="article-category"
          {...register("category", {
            required: "La catégorie est obligatoire",
          })}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="" disabled>
            Sélectionner une catégorie
          </option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-600 text-xs">{errors.category.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="article-size"
          className="text-sm font-medium text-gray-700"
        >
          Taille
        </label>
        <input
          id="article-size"
          {...register("size", { required: "La taille est obligatoire" })}
          placeholder="Taille"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        {errors.size && (
          <p className="text-red-600 text-xs">{errors.size.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="article-condition"
          className="text-sm font-medium text-gray-700"
        >
          État
        </label>
        <select
          id="article-condition"
          {...register("condition", {
            required: "La condition est obligatoire",
          })}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          <option value="" disabled>
            Sélectionner un état
          </option>
          {CONDITIONS.map((cond) => (
            <option key={cond.value} value={cond.value}>
              {cond.label}
            </option>
          ))}
        </select>
        {errors.condition && (
          <p className="text-red-600 text-xs">{errors.condition.message}</p>
        )}
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="article-imageUrl"
          className="text-sm font-medium text-gray-700"
        >
          Image URL
        </label>
        <input
          id="article-imageUrl"
          {...register("imageUrl", {
            required: "L'URL de l'image est obligatoire",
          })}
          placeholder="https://..."
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        {errors.imageUrl && (
          <p className="text-red-600 text-xs">{errors.imageUrl.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
      >
        {isPending ? "Envoi..." : "Créer l'article"}
      </button>

      {isError && (
        <p
          role="alert"
          className="text-red-600 text-sm text-center"
        >
          {error?.message ?? "Une erreur est survenue lors de la création"}
        </p>
      )}
    </form>
  );
};

export default CreateArticleForm;
