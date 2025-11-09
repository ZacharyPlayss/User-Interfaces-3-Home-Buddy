import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteAutomation} from "../../../services/automationService.ts";
import {automationQueryKeys} from "../../../config/api/queryKeys";

//Nothing relates to an automation so this can always be safely deleted.
export function useDeleteAutomation() {
    const queryClient = useQueryClient()
    const { mutate, isSuccess, isError, isPending } = useMutation({
        mutationFn: (automationId: string) => deleteAutomation(automationId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:automationQueryKeys.all,
            });
            queryClient.invalidateQueries({
                queryKey: automationQueryKeys.allBySceneId,
            });
        }
    });

    return {
        deleteAutomation: mutate,
        isSuccess,
        isError,
        isPending,
    };
}