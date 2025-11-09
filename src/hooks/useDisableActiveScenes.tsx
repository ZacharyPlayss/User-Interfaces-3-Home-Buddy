import {useMutation, useQueryClient} from "@tanstack/react-query";
import {disableScene} from "../services/sceneService.ts";
import {sceneQueryKeys} from "../config/api/queryKeys";

export function useDisableActiveScenes() {
    const queryClient = useQueryClient();

    const { mutateAsync: disableActiveScenes, isPending, error } = useMutation({
        mutationFn: disableScene,
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: sceneQueryKeys.all
            });
            queryClient.invalidateQueries({
                queryKey:sceneQueryKeys.allActive
            });
        },

    });

    return { disableActiveScenes, isPending, error };

}
