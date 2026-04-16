import { useCreateArticleForm } from "../hooks/useCreateArticleForm"
import type {CreateArticleProps} from "../hooks/useCreateArticleForm"
import  { VALID_CATEGORIES,VALID_CONDITIONS} from "../../server/src/types";

const CreateArticleForm = (props: CreateArticleProps) => {
  const { register, handleSubmit, onSubmit, isPending, errors } =
    useCreateArticleForm(props);

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md space-y-5"
    >

      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Titre</label>
        <input
          {...register("title", {
            required: "Le titre est obligatoire",
            minLength: { value: 3, message: "Minimum 3 caractères" },
            maxLength: { value: 100, message: "Maximum 100 caractères" }
          })}
          placeholder="Titre de l'article"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        {errors.title && (
          <p className="text-red-600 text-xs">{errors.title.message}</p>
        )}
      </div>


      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register("description", {
            required: "La description est obligatoire",
            minLength: { value: 10, message: "La description doit au moins contenir 10 caractères" },
            maxLength: { value: 1000, message: "La description ne peut dépasser 1000 caractères" }
          })}
          placeholder="Décris ton article"
          className="border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        {errors.description && (
          <p className="text-red-600 text-xs">{errors.description.message}</p>
        )}
      </div>

     
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Prix (€)</label>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            valueAsNumber: true,
            required: "Le prix est obligatoire",
            min: { value: 0.1, message: "La valeur doit être supérieure à 0" }
          })}
          placeholder="Prix"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        {errors.price && (
          <p className="text-red-600 text-xs">{errors.price.message}</p>
        )}
      </div>

      
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Catégorie</label>
        <select
          {...register("category", { required: "La catégorie est obligatoire" })}
          placeholder="Catégorie"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          onChange={onchange}
        >
          {VALID_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
        </select>
        {errors.category && (
          <p className="text-red-600 text-xs">{errors.category.message}</p>
        )}
      </div>

      
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Taille</label>
        <input
          {...register("size", { required: "La taille est obligatoire" })}
          placeholder="Taille"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
        {errors.size && (
          <p className="text-red-600 text-xs">{errors.size.message}</p>
        )}
      </div>

      
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">État</label>
        <select
          {...register("condition", { required: "La condition est obligatoire" })}
          placeholder="État"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          onChange={onchange}
        >
           {VALID_CONDITIONS.map((cond) => (
          <option key={cond} value={cond}>
            {cond}
          </option>
           ))}
        </select>
        {errors.condition && (
          <p className="text-red-600 text-xs">{errors.condition.message}</p>
        )}
      </div>

     
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Image URL</label>
        <input
          {...register("imageUrl", { required: "L'URL de l'image est obligatoire" })}
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

    </form>
  );
};

export default CreateArticleForm;
