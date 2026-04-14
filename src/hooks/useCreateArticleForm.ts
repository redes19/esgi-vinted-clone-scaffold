import { useForm, SubmitHandler } from "react-hook-form"
import type {Article}  from "../types/article"
import { api } from "../services/api";
import { useMutation } from "@tanstack/react-query";


interface CreateArticleProps {
    title: string;
    description: string;
    price: number;
    category: string;
    size: string;
    condition: string;
    imageUrl: string;
}


export const useCreateArticleForm = (article: CreateArticleProps) => {
    const { register, handleSubmit, control } = useForm({
        title: article.title,
        description: article.description,
        price: article.price,
        category: article.category,
        size: article.size,
        condition: article.condition,
        imageUrl: article.imageUrl
    });


    const { data , isLoading , isError} = useMutation<CreateArticleProps>(
        {
            mutationFn: (articleId: string) => api.post("/api/article/"+articleId,{id: articleId ,body:article}),
            onSuccess: () => {}
        }
    )
    return {article: data, isLoading, isError};
}