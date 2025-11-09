import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {DomoticaControlWithoutId} from "../../../model/DomoticaControl.ts";
import {addDomoticaControl} from "../../../services/domoticaControlService.ts";
import {domoticaControlQueryKeys} from "../../../config/api/queryKeys";

export function useAddDomoticaControl(){
    const queryClient = useQueryClient()
    const{mutate,isPending,isError} = useMutation(
        {
            mutationFn: async(newDomoticaControl: DomoticaControlWithoutId) => {
                return addDomoticaControl(newDomoticaControl)
            },
            onSuccess:() => queryClient.invalidateQueries({queryKey:domoticaControlQueryKeys.all})
        }
    )

    return{
        isPending,
        isError,
        addNewDomoticaControl:mutate
    }
}