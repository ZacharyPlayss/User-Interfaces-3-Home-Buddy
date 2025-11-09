import {useMutation, useQueryClient} from "@tanstack/react-query";
import {automationQueryKeys, sceneQueryKeys} from "../../../config/api/queryKeys";
import {enableAutomation} from "../../../services/automationService.ts";


export function useEnableAutomation() {
    const queryClient = useQueryClient();

    const {mutate, isPending, isError, isSuccess} = useMutation({
        mutationFn: (automationId: string) => enableAutomation(automationId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: sceneQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: automationQueryKeys.all
            });
        }
    })
    return {
        isSucces: isSuccess,
        isError,
        isPending,
        enableAutomation: mutate
    }
}