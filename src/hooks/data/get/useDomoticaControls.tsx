import {useSuspenseQuery} from "@tanstack/react-query";
import type {DomoticaControl} from "../../../model/DomoticaControl.ts";
import {getAllDomoticaControls} from "../../../services/domoticaControlService.ts";
import {domoticaControlQueryKeys} from "../../../config/api/queryKeys";

export function useDomoticaControls(options?: { enabled?: boolean }) {
    const {data: domoticaControls, isLoading} = useSuspenseQuery<DomoticaControl[]>({
        queryKey: domoticaControlQueryKeys.all,
        queryFn: () => getAllDomoticaControls(),
        ...options
    })

    return {
        domoticaControls: domoticaControls,
        isLoading
    }
}
