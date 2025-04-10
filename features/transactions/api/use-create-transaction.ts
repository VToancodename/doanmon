import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query" 

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.transactions.$post>
type ResquestType = InferRequestType<typeof client.api.transactions.$post>["json"]

export const useCreateTransaction = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        ResquestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.transactions.$post({ json })
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Transaction created")
            queryClient.invalidateQueries({ queryKey: ["transactions"]});
            queryClient.invalidateQueries({ 
                queryKey: [
                    "summary"
                ]});
        },
        onError: () => {
            toast.error("Faild to create transaction")
        },
    });
    return mutation
}





