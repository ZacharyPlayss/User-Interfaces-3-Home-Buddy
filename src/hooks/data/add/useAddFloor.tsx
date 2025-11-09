import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {FloorWithoutId} from "../../../model/Floor.ts";
import {addFloor} from "../../../services/floorService.ts";
import {floorQueryKeys} from "../../../config/api/queryKeys";

export function useAddFloor(){
    const queryClient = useQueryClient()
    const{mutate,isPending,isError} = useMutation(
        {
            mutationFn: async(newFloor: FloorWithoutId) => {
                return addFloor(newFloor)
            },
            onSuccess:() => {
                queryClient.invalidateQueries({queryKey: floorQueryKeys.all});
                queryClient.invalidateQueries({queryKey: floorQueryKeys.allWithRooms})
            }
        }
    )

    return{
        isPending,
        isError,
        addNewFloor:mutate
    }
}