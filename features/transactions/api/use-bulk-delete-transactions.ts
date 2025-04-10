import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query" 

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>
type ResquestType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>["json"]

export const useBulkDeleteTransactions = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        ResquestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.transactions["bulk-delete"]["$post"]({json})
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Transactions deleted")
            queryClient.invalidateQueries({ queryKey: ["transactions"]});
            queryClient.invalidateQueries({ 
                queryKey: [
                    "summary"
                ]});
            //TODO: Also invalidate sumary
        },
        onError: () => {
            toast.error("Faild to delete transaction")
        },
    });
    return mutation
}





