import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteDomoticaControl} from "../../../services/domoticaControlService.ts";
import {domoticaControlQueryKeys} from "../../../config/api/queryKeys";

export function useDeleteDomoticaControl() {
    const queryClient = useQueryClient();
    const { mutate, isSuccess, isError, isPending } = useMutation({
        mutationFn: (controlId: string) => deleteDomoticaControl(controlId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: domoticaControlQueryKeys.all,
            });
        }
    });

    return {
        deleteDomoticaControl: mutate,
        isSuccess,
        isError,
        isPending,
    };
}