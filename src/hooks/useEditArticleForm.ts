import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { Article } from "../types/article";
import { type EditArticleProps } from "../types/article";

export const useEditArticleForm = (
  articleId: string,
  initialValues?: EditArticleProps,
) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<EditArticleProps>({
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      price: initialValues?.price ?? 0,
      category: initialValues?.category ?? "",
      size: initialValues?.size ?? "",
      condition: initialValues?.condition ?? "",
      imageUrl: initialValues?.imageUrl ?? "",
    },
    values: initialValues,
  });

  const { mutate, isError, isSuccess, isPending, error } = useMutation<
    Article,
    Error,
    EditArticleProps
  >({
    mutationFn: (data) =>
      api.put<Article>(
        `/api/articles/${articleId}`,
        data as unknown as Record<string, unknown>,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["article", articleId] });
      queryClient.invalidateQueries({ queryKey: ["article"] });
      navigate(`/articles/${response.id}`);
    },
  });

  const onSubmit: SubmitHandler<EditArticleProps> = (data) => mutate(data);

  return {
    register,
    handleSubmit,
    onSubmit,
    reset,
    errors,
    isDirty,
    isPending,
    isError,
    isSuccess,
    error,
  };
};
