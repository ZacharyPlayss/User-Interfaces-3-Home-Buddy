import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {DomoticaControl} from "../../../model/DomoticaControl.ts";
import {updateDomoticaControlValues} from "../../../services/domoticaControlService.ts";
import {domoticaControlQueryKeys} from "../../../config/api/queryKeys";

export function useUpdateDomoticaControlValues() {
    const queryClient = useQueryClient();

    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationFn: ({ id, value }: { id: string; value: DomoticaControl["value"] }) => updateDomoticaControlValues(id, value),
        onSuccess: (data: DomoticaControl) => {
            queryClient.invalidateQueries({ queryKey: domoticaControlQueryKeys.byId(data.id) });
        },
    });

    return {
        updateDomoticaControlValues: mutate,
        isPending,
        isError,
        isSuccess,
    };
}