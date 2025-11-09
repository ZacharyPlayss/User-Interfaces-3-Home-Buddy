import {useSuspenseQuery} from "@tanstack/react-query";
import type {DomoticaControl} from "../../../model/DomoticaControl.ts";
import {getAllDomoticaControlsForRoom} from "../../../services/domoticaControlService.ts";
import {domoticaControlQueryKeys} from "../../../config/api/queryKeys";

export function useDomoticaControlsForRoom(roomId:string, options?: { enabled?: boolean }) {
    const {isLoading, isError, data: domoticaControls} = useSuspenseQuery<DomoticaControl[]>({
        queryKey: domoticaControlQueryKeys.all,
        queryFn: () => getAllDomoticaControlsForRoom(roomId),
        ...options
    })

    return {
        isLoading,
        isError,
        domoticaControls: domoticaControls
    }
}
