import {useSuspenseQuery} from "@tanstack/react-query";
import type {Scene} from "../../../../model/Scene.ts";
import {getScene} from "../../../../services/sceneService.ts";
import {sceneQueryKeys} from "../../../../config/api/queryKeys";


export function useScene(sceneId: string, options?: { enabled?: boolean }) {
    const {data: scene} = useSuspenseQuery<Scene>({
        queryKey: sceneQueryKeys.byId(sceneId),
        queryFn: () => getScene(sceneId),
        ...options
    })

    return {
        scene
    }
}
