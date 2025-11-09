import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addAutomation} from "../../../services/automationService.ts";
import type {AutomationWithoutId} from "../../../model/Automation.ts";
import {automationQueryKeys} from "../../../config/api/queryKeys";

export function useAddAutomation() {
    const queryClient = useQueryClient()
    const {mutate,mutateAsync, isPending, isError} = useMutation(
        {
            mutationFn: async (newAutomation: AutomationWithoutId) => {
                return addAutomation(newAutomation)
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: automationQueryKeys.all});
                queryClient.invalidateQueries({queryKey: automationQueryKeys.allBySceneId});
            }
        }
    )

    return {
        isPending,
        isError,
        addNewAutomation: mutate,
        addNewAutomationAsync: mutateAsync
    }
}