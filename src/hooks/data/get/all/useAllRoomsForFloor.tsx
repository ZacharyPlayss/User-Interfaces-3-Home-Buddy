import {useSuspenseQuery} from "@tanstack/react-query";
import type {Room} from "../../../../model/Room.ts";
import {getAllRoomsOnFloor} from "../../../../services/roomService.ts";
import {roomQueryKeys} from "../../../../config/api/queryKeys";

export function useAllRoomsForFloor(floorId:string,options?: { enabled?: boolean }) {
    const {isLoading, isError, data: rooms} = useSuspenseQuery<Room[]>({
        queryKey: roomQueryKeys.all,
        queryFn: () => getAllRoomsOnFloor(floorId),
        ...options
    })

    return {
        roomsIsLoading: isLoading,
        roomsIsError: isError,
        rooms
    }
}
