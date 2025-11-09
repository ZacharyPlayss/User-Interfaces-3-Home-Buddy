import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {Floor} from "../../../model/Floor.ts";
import {updateFloor} from "../../../services/floorService.ts";
import {floorQueryKeys} from "../../../config/api/queryKeys";

export function useUpdateFloor() {
    const queryClient = useQueryClient();

    const {mutate, isPending, isError, isSuccess} = useMutation({
        mutationFn: (updatedFloor: Floor) => updateFloor(updatedFloor),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: floorQueryKeys.allWithRooms,
            });
        }
    })

    return {
        updateFloor: mutate,
        isPending,
        isError,
        isSuccess,
    };
}

