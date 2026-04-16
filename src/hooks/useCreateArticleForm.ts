import { useForm } from "react-hook-form"
import type {Article}  from "../types/article"
import { api } from "../services/api";
import { useMutation } from "@tanstack/react-query";


export interface CreateArticleProps {
    title: string;
    description: string;
    price: number;
    category: string;
    size: string;
    condition: string;
    imageUrl: string;
}


export const useCreateArticleForm = (initialValues?: CreateArticleProps) => {
    const {
        register,
        handleSubmit ,
        formState: { errors }, 
        } 
        = useForm({
            defaultValues: {
                title: initialValues?.title ?? "",
                description: initialValues?.description ?? "",
                price: initialValues?.price ?? 0,
                category: initialValues?.category ?? "",
                size: initialValues?.size ?? "",
                condition: initialValues?.condition ?? "",
                imageUrl: initialValues?.imageUrl ?? ""
            }});

    const onError: SubmitErrorHandler<CreateArticleProps> = (errors) => console.log(errors);


    const { mutate,
            isError,
            isSuccess,
            isPending
            } = useMutation<CreateArticleProps>(
        {
            mutationFn: (data) => api.post("/api/articles",{body:data}),
            onSuccess: () => {},
            onError: (errors) => onError(errors),
        }
    )

    const onSubmit: SubmitHandler<CreateArticleProps> = (data) => mutate(data);
    

    return {register,isError,isSuccess,isPending,handleSubmit,errors,onSubmit};
}


