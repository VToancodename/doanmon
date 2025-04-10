import { toast } from "sonner"
import { InferRequestType, InferResponseType } from "hono"
import { useMutation, useQueryClient } from "@tanstack/react-query" 

import { client } from "@/lib/hono"

type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>
type ResquestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"]

export const useBulkDeleteCategory = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        ResquestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.categories["bulk-delete"]["$post"]({json})
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Categories deleted")
            queryClient.invalidateQueries({ queryKey: ["categories"]});
            queryClient.invalidateQueries({ 
                queryKey: [
                    "summary"
                ]});
        },
        onError: () => {
            toast.error("Faild to delete categories")
        },
    });
    return mutation
}





