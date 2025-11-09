import {useSuspenseQuery} from "@tanstack/react-query";
import type {Automation} from "../../../../model/Automation.ts";
import {getAutomation} from "../../../../services/automationService.ts";
import {automationQueryKeys} from "../../../../config/api/queryKeys";

export function useAutomation(automationId: string,options?: { enabled?: boolean }) {
    const {data: automation} = useSuspenseQuery<Automation>({
        queryKey: automationQueryKeys.byId(automationId),
        queryFn: () => getAutomation(automationId),
        ...options
    })

    return {
        automation
    }
}
