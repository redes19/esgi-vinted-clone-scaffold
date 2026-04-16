import { useCreateArticleForm } from "../hooks/useCreateArticleForm"
import type {CreateArticleProps} from "../hooks/useCreateArticleForm"
import { Form } from "react-router";

export const CreateArticleForm = (props: CreateArticleProps) => {
  const { register, handleSubmit, onSubmit, isPending, errors } =
    useCreateArticleForm(props);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input
        {...register("title", {
          required: "Le titre est obligatoire",
          minLength: { value: 3, message: "Minimum 3 caractères" },
          maxLength: { value: 100, message: "Maximum 100 caractères" }
        })}
        placeholder="Title"
      />
      {errors.title && <p>{errors.title.message}</p>}

      <input
        {...register("description", {
          required: "La description est obligatoire",
          minLength: { value: 10, message: "La description doit au moins contenir 10 caractères" },
          maxLength: { value: 1000, message: "La description ne peut dépasser 1000 caractères" }
        })}
        placeholder="Description"
      />
      {errors.description && <p>{errors.description.message}</p>}

      <input
        {...register("price", {
          required: "Le prix est obligatoire",
          min: { value: 0.1, message: "La valeur doit être supérieure à 0" }
        })}
        placeholder="Price"
      />
      {errors.price && <p>{errors.price.message}</p>}

      <input
        {...register("category", { required: "La catégorie est obligatoire" })}
        placeholder="Category"
      />
      {errors.category && <p>{errors.category.message}</p>}

      <input
        {...register("size", { required: "La taille est obligatoire" })}
        placeholder="Size"
      />
      {errors.size && <p>{errors.size.message}</p>}

      <input
        {...register("condition", { required: "La condition est obligatoire" })}
        placeholder="Condition"
      />
      {errors.condition && <p>{errors.condition.message}</p>}

      <input
        {...register("imageUrl", { required: "L'URL de l'image est obligatoire" })}
        placeholder="Image Url"
      />
      {errors.imageUrl && <p>{errors.imageUrl.message}</p>}

      <input type="submit" disabled={isPending} />
    </form>
  );
};