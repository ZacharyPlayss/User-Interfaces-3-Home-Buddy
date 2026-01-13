import {useSuspenseQuery} from "@tanstack/react-query";
import type {DomoticaControl} from "../../../../model/DomoticaControl.ts";
import {getDomoticaControl} from "../../../../services/domoticaControlService.ts";
import {domoticaControlQueryKeys} from "../../../../config/api/queryKeys";

export function useDomoticaControl(id:string, options?: { enabled?: boolean }) {
    const {data: domoticaControl} = useSuspenseQuery<DomoticaControl>({
        queryKey: domoticaControlQueryKeys.byId(id),
        queryFn: async () => {
            const data = await getDomoticaControl(id);
            if (!data) throw new Error("Domotica Control not found");
            return data;
        },
        ...options
    })

    return {
        domoticaControl: domoticaControl
    }
}
