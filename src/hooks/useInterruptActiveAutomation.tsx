import {useMutation, useQueryClient} from "@tanstack/react-query";

import {interruptActiveAutomation} from "../services/automationService.ts";
import {automationQueryKeys, domoticaControlQueryKeys, sceneQueryKeys} from "../config/api/queryKeys";

export function useInterruptActiveAutomation() {
    const queryClient = useQueryClient();

    const { mutateAsync: interruptActiveScene, isPending, error } = useMutation({
        mutationFn: interruptActiveAutomation,
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: automationQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey: sceneQueryKeys.all
            })
            queryClient.invalidateQueries({
                queryKey: domoticaControlQueryKeys.all
            })
        },

    });

    return { interruptActiveScene, isPending, error };

}
