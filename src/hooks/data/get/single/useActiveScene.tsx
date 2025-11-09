import {useQuery} from "@tanstack/react-query";
import type {Scene} from "../../../../model/Scene.ts";
import {getActiveScenes} from "../../../../services/sceneService.ts";
import {sceneQueryKeys} from "../../../../config/api/queryKeys";

export function useActiveScene(options?: { enabled?: boolean }){
    const {isLoading, isError, data: scenes} = useQuery<Scene[]>({
        queryKey:  sceneQueryKeys.allActive,
        queryFn: () => getActiveScenes(),
        ...options
    })

    //Since the program flow only allows 1 scene active at the sametime but json-server responds to query's with '?' in it in array-form.
    const scene = scenes?.[0] ?? null;

    return {
        isLoading,
        isError,
        activeScene: scene
    }
}