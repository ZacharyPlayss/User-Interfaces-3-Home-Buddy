import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteRoom} from "../../../services/roomService.ts";
import {floorQueryKeys, roomQueryKeys} from "../../../config/api/queryKeys";

export function useDeleteRoom() {
    const queryClient = useQueryClient();
    const { mutate, isSuccess, isError, isPending } = useMutation({
        mutationFn: (roomId: string) => deleteRoom(roomId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey:  floorQueryKeys.allWithRooms,
            });
            queryClient.invalidateQueries({
                queryKey:  roomQueryKeys.all,
            });
        }
    });

    return {
        deleteRoom: mutate,
        isSuccess,
        isError,
        isPending,
    };
}