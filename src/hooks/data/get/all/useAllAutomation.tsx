import {useSuspenseQuery} from "@tanstack/react-query";
import type {Automation} from "../../../../model/Automation.ts";
import {getAllAutomations} from "../../../../services/automationService.ts";
import {automationQueryKeys} from "../../../../config/api/queryKeys";

export function useAllAutomation(options?: { enabled?: boolean }) {
    const {data: automations} = useSuspenseQuery<Automation[]>({
        queryKey:automationQueryKeys.all,
        queryFn: () => getAllAutomations(),
        ...options
    })

    return {
        automations
    }
}
