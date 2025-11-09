import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {Room} from "../../../model/Room.ts";
import {updateRoom} from "../../../services/roomService.ts";
import {floorQueryKeys, roomQueryKeys} from "../../../config/api/queryKeys";

export function useUpdateRoom() {
    const queryClient = useQueryClient();
    const {mutate, isPending, isError, isSuccess} = useMutation({
        mutationFn: (updatedRoom: Room) => updateRoom(updatedRoom),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: roomQueryKeys.all,
            });
            queryClient.invalidateQueries({
                queryKey: floorQueryKeys.allWithRooms,
            });
        }
    })


    return {
        updateRoom: mutate,
        isPending,
        isError,
        isSuccess,
    };
}

