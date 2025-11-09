import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateAutomation} from "../../../services/automationService.ts";
import type {Automation} from "../../../model/Automation.ts";
import {automationQueryKeys} from "../../../config/api/queryKeys";

export function useUpdateAutomation() {
    const queryClient = useQueryClient();

    const {mutate, isPending, isError, isSuccess} = useMutation({
        mutationFn: (updatedAutomation: Automation) => updateAutomation(updatedAutomation),
        onSuccess: (data: Automation) => {
            queryClient.invalidateQueries({
                queryKey: automationQueryKeys.byId(data.id),
            });
        }
    })

    return {
        updateAutomation: mutate,
        isPending,
        isError,
        isSuccess,
    };
}