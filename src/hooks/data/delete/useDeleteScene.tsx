import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteScene} from "../../../services/sceneService.ts";
import {sceneQueryKeys} from "../../../config/api/queryKeys";


export function useDeleteScene() {
    const queryClient = useQueryClient();
    const { mutate, isSuccess, isError, isPending } = useMutation({
        mutationFn: (sceneId: string) => deleteScene(sceneId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: sceneQueryKeys.all,
            });
        }
    });

    return {
        deleteScene: mutate,
        isSuccess,
        isError,
        isPending,
    };
}