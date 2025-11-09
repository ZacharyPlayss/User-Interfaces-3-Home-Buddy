import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {Scene} from "../../../model/Scene.ts";
import {updateScene} from "../../../services/sceneService.ts";
import {sceneQueryKeys} from "../../../config/api/queryKeys";

export function useUpdateScene() {
    const queryClient = useQueryClient();

    const {mutate, isPending, isError, isSuccess} = useMutation({
        mutationFn: (updatedScene: Scene) => updateScene(updatedScene),
        onSuccess: (data: Scene) => {
            queryClient.invalidateQueries({
                queryKey:sceneQueryKeys.byId(data.id),
            });
            queryClient.invalidateQueries({
                queryKey:sceneQueryKeys.allActive
            });
        }
    })

    return {
        updateScene: mutate,
        isPending,
        isError,
        isSuccess,
    };
}