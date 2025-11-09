import {useSuspenseQuery} from "@tanstack/react-query";
import type {FloorWithRooms} from "../../../../model/Floor.ts";
import {getAllFloorsWithRooms} from "../../../../services/floorService.ts";
import {floorQueryKeys} from "../../../../config/api/queryKeys";

export function useAllFloorsWithRooms(options?: { enabled?: boolean}) {
    const {data: floorsWithRooms} = useSuspenseQuery<FloorWithRooms[]>({
        queryKey: floorQueryKeys.allWithRooms,
        queryFn: () => getAllFloorsWithRooms(),
        ...options
    })


    return {
        floors: floorsWithRooms
    }
}
