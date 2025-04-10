import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query" 

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>
type ResquestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"]

export const useEditAccount = (id?: string) => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        ResquestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.accounts[":id"]["$patch"]({ 
                param: { id },
                json,
            })
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account updated");
            queryClient.invalidateQueries({ 
                queryKey: [
                    "account", 
                    { id }
                ]});
            queryClient.invalidateQueries({ 
                queryKey: [
                    "accounts"
                ]});
            queryClient.invalidateQueries({ 
                queryKey: [
                    "transactions"
                ]});
            queryClient.invalidateQueries({ 
                queryKey: [
                    "summary"
                ]});
            //TODO: Invalidate summary and transactions
        },
        onError: () => {
            toast.error("Faild to edit account")
        },
    });
    return mutation
}





