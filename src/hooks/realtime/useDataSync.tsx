import {useQueryClient} from "@tanstack/react-query";
import {domoticaControlQueryKeys, floorQueryKeys, roomQueryKeys, sceneQueryKeys} from "../../config/api/queryKeys";
import {refetchInterval} from "../../config/realtime/config.ts";
import {useInterval} from 'usehooks-ts'

interface dataSyncProps{
    interval?:number;
    enableLogging?:boolean;
}

//This hook previously used 'refetch' on queries. This lead to a verry laggy experience.
//New approach => We only invalidate all the queries causing the app to 'force refetch' what it needs thus producing similar logic without lag.
export function useDataSync({interval = refetchInterval,enableLogging= false}:dataSyncProps){
    const queryClient = useQueryClient();
    useInterval(
        () => {
            invalidateDataQueries();
            if(enableLogging){
                console.log("POLLING - invalidated all queries for a force refetch.");
            }
        },
         interval,
    )

    function invalidateDataQueries(){
        queryClient.invalidateQueries({
            queryKey:floorQueryKeys.allWithRooms,
        });
        queryClient.invalidateQueries({
            queryKey:roomQueryKeys.all,
        });
        queryClient.invalidateQueries({
            queryKey:domoticaControlQueryKeys.all,
        });
        queryClient.invalidateQueries({
            queryKey:sceneQueryKeys.all,
        });
    }
}