import {useSuspenseQuery} from "@tanstack/react-query";
import type {DomoticaControl} from "../../../../model/DomoticaControl.ts";
import {getDomoticaControl} from "../../../../services/domoticaControlService.ts";
import {domoticaControlQueryKeys} from "../../../../config/api/queryKeys";

export function useDomoticaControl(id:string, options?: { enabled?: boolean }) {
    const {data: domoticaControl} = useSuspenseQuery<DomoticaControl>({
        queryKey: domoticaControlQueryKeys.byId(id),
        queryFn: () => getDomoticaControl(id),
        ...options
    })

    return {
        domoticaControl: domoticaControl
    }
}
