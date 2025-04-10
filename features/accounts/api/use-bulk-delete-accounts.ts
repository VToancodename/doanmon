import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query" 

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>
type ResquestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"]

export const useBulkDeleteAccount = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        ResquestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.accounts["bulk-delete"]["$post"]({json})
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account deleted")
            queryClient.invalidateQueries({ queryKey: ["accounts"]});
            //TODO: Also invalidate sumary
        },
        onError: () => {
            toast.error("Faild to delete account")
        },
    });
    return mutation
}





