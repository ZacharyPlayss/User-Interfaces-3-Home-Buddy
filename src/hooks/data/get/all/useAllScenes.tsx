import {useSuspenseQuery} from "@tanstack/react-query";
import type {Scene} from "../../../../model/Scene.ts";
import {getAllScenes} from "../../../../services/sceneService.ts";
import {sceneQueryKeys} from "../../../../config/api/queryKeys";

export function useAllScenes(options?: { enabled?: boolean }) {
    const {data: scenes} = useSuspenseQuery<Scene[]>({
        queryKey: sceneQueryKeys.all,
        queryFn: () => getAllScenes(),
        ...options
    })

    return {
        scenes,
    }
}
