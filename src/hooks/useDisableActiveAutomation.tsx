import {useMutation, useQueryClient} from "@tanstack/react-query";
import {disableAutomation} from "../services/automationService.ts";
import {automationQueryKeys, sceneQueryKeys} from "../config/api/queryKeys";

export function useDisableActiveAutomation() {
    const queryClient = useQueryClient();

    const { mutateAsync: disableActiveAutomation, isPending, error } = useMutation({
        mutationFn: disableAutomation,
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: automationQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: sceneQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: sceneQueryKeys.allActive
            });
        },

    });

    return { disableActiveAutomation, isPending, error };

}

