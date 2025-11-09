import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {DomoticaControl, DomoticaControlWithoutValues} from "../../../model/DomoticaControl.ts";
import {updateDomoticaControl} from "../../../services/domoticaControlService.ts";
import {domoticaControlQueryKeys} from "../../../config/api/queryKeys";

export function useUpdateDomoticaControl() {
    const queryClient = useQueryClient();

    const {mutate, isPending, isError, isSuccess} = useMutation({
        mutationFn: (updatedDomoticaControl: DomoticaControl) => updateDomoticaControl(updatedDomoticaControl),
        onSuccess: (data: DomoticaControlWithoutValues) => {
            queryClient.invalidateQueries({
                queryKey: domoticaControlQueryKeys.byId(data.id),
            });
        }
    })

    return {
        updateDomoticaControl: mutate,
        isPending,
        isError,
        isSuccess,
    };
}