import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {SceneWithoutId} from "../../../model/Scene.ts";
import {addScene} from "../../../services/sceneService.ts";
import {sceneQueryKeys} from "../../../config/api/queryKeys";

export function useAddScene(){
    const queryClient = useQueryClient()
    const{mutate,mutateAsync,isPending,isError} = useMutation(
        {
            mutationFn: async(newScene: SceneWithoutId) => {
                return addScene(newScene)
            },
            onSuccess:() => queryClient.invalidateQueries({queryKey: sceneQueryKeys.all})
        }
    )

    return{
        isPending,
        isError,
        addNewScene:mutate,
        addNewSceneAsync: mutateAsync
    }
}