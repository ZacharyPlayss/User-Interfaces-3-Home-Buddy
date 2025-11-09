import {useSuspenseQuery} from "@tanstack/react-query";
import type {Automation} from "../../../model/Automation.ts";
import {getAutomationsBySceneId} from "../../../services/automationService.ts";
import {automationQueryKeys} from "../../../config/api/queryKeys";

export function useAutomationsBySceneId(sceneId: string, options?: { enabled?: boolean }) {
    const {data: automations} = useSuspenseQuery<Automation[]>({
        queryKey: automationQueryKeys.all,
        queryFn: () => getAutomationsBySceneId(sceneId),
        ...options
    })

    return {
        automations
    }
}