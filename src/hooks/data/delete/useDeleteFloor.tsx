import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteFloor} from "../../../services/floorService.ts";
import {floorQueryKeys} from "../../../config/api/queryKeys";

export function useDeleteFloor() {
    const queryClient = useQueryClient();

    const { mutate, isSuccess, isError, isPending } = useMutation({
        mutationFn: (floorId: string) => deleteFloor(floorId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: floorQueryKeys.allWithRooms,
            });
            queryClient.invalidateQueries({
                queryKey:  floorQueryKeys.all,
            });
        }
    });

    return {
        deleteFloor: mutate,
        isSuccess,
        isError,
        isPending,
    };
}