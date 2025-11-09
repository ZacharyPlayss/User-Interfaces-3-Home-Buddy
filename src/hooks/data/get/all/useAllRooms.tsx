import {useSuspenseQuery} from "@tanstack/react-query";
import type {Room} from "../../../../model/Room.ts";
import {getAllRooms} from "../../../../services/roomService.ts";
import {roomQueryKeys} from "../../../../config/api/queryKeys";

export function useAllRooms(options?: { enabled?: boolean }) {
    const {isLoading, isError, data: rooms} = useSuspenseQuery<Room[]>({
        queryKey:roomQueryKeys.all,
        queryFn: () => getAllRooms(),
        ...options
    })

    return {
        roomsIsLoading: isLoading,
        roomsIsError: isError,
        rooms
    }
}
