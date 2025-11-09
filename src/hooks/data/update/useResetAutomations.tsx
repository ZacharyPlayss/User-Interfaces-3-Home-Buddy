import {useMutation, useQueryClient} from "@tanstack/react-query";
import {resetActiveAutomations} from "../../../services/automationService.ts";
import {automationQueryKeys, sceneQueryKeys} from "../../../config/api/queryKeys";

export function useResetAutomations(){
    const queryClient = useQueryClient();

    const {mutate, isPending, isError, isSuccess} = useMutation({
        mutationFn: () => resetActiveAutomations(),
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
        resetActiveAutomations: mutate
    }
}