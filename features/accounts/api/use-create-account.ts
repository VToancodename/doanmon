import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query" 

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.accounts.$post>
type ResquestType = InferRequestType<typeof client.api.accounts.$post>["json"]

export const useCreateAccount = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        ResquestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.accounts.$post({ json })
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account created")
            queryClient.invalidateQueries({ queryKey: ["accounts"]});
        },
        onError: () => {
            toast.error("Faild to create account")
        },
    });
    return mutation
}





