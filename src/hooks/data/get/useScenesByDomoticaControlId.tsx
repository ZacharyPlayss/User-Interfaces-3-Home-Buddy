import {useSuspenseQuery} from "@tanstack/react-query";
import type {Scene} from "../../../model/Scene.ts";
import {getScenesByControlId} from "../../../services/sceneService.ts";
import {sceneQueryKeys} from "../../../config/api/queryKeys";


export function useScenesByDomoticaControlId(domoticaControlId: string, options?: { enabled?: boolean }) {
    const {data: scenes} = useSuspenseQuery<Scene[]>({
        queryKey: sceneQueryKeys.all,
        queryFn: () => getScenesByControlId(domoticaControlId),
        ...options
    })

    return {
        scenes
    }
}
