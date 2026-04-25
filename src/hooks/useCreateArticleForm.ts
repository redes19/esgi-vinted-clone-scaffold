import { useEffect } from "react";
import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";
import { api } from "../services/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { Article } from "../types/article";

export interface CreateArticleProps {
  title: string;
  description: string;
  price: number;
  category: string;
  size: string;
  condition: string;
  imageUrl: string;
}

const DRAFT_KEY = "create-article-draft"

export const useCreateArticleForm = (initialValues?: CreateArticleProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
      price: initialValues?.price ?? 0,
      category: initialValues?.category ?? "",
      size: initialValues?.size ?? "",
      condition: initialValues?.condition ?? "",
      imageUrl: initialValues?.imageUrl ?? "",
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (!saved) return;

    try {
      reset(JSON.parse(saved));
    } catch {}
  }, [reset]);

  useEffect(() => {
    const subscription = watch((values) => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onError: SubmitErrorHandler<CreateArticleProps> = (errors) =>
    console.log(errors);

  const { mutate, isError, isSuccess, isPending } = useMutation<
    Article,
    Error,
    CreateArticleProps
  >({
    mutationFn: (data) => api.post<Article>("/api/articles", data),
    onSuccess: (response) => {
      localStorage.removeItem(DRAFT_KEY);
      reset();

      navigate(`/articles/${response.id}`);
    },
    onError: (errors) => onError(errors),
  });

  const onSubmit: SubmitHandler<CreateArticleProps> = (data) => mutate(data);

  return {
    register,
    isError,
    isSuccess,
    isPending,
    handleSubmit,
    errors,
    onSubmit,
  };
};
