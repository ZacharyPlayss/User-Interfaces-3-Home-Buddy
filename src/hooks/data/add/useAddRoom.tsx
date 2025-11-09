import {useMutation, useQueryClient} from "@tanstack/react-query";
import type {NewRoom} from "../../../model/Room.ts";
import {addRoom} from "../../../services/roomService.ts";
import {floorQueryKeys, roomQueryKeys} from "../../../config/api/queryKeys";

export function useAddRoom(){
    const queryClient = useQueryClient()
    const{mutate,isPending,isError} = useMutation(
        {
            mutationFn: async(newRoom: NewRoom) => {
                return addRoom(newRoom)
            },
            onSuccess:() => {
                queryClient.invalidateQueries({queryKey:roomQueryKeys.all});
                queryClient.invalidateQueries({queryKey:floorQueryKeys.allWithRooms});
            }
        }
    )

    return{
        isPending,
        isError,
        addNewRoom:mutate
    }
}