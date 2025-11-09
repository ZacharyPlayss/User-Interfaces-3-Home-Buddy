import * as z from 'zod'
import {idSchema} from "./idSchema.ts";

export const newRoomSchema = z.object({
    name: z.string().min(1, {message: "Naam moet minstens 1 karakter lang zijn."}).max(100, {message: "Naam mag niet langer zijn dan 100 karakters."}),
    description: z.string().optional(),
    width: z.number().nonnegative({message: "Breedte kan niet negatief zijn."}),
    height: z.number().nonnegative({message: "Hoogte kan niet negatief zijn."}),
    maxWidth: z.number(),
    maxHeight: z.number(),
    x: z.number().nonnegative({message: "X kan niet negatief zijn."}),
    y: z.number().nonnegative({message: "Y kan niet negatief zijn."}),
    floorId: z.string()
})
    .refine((data) => data.width <= data.maxWidth, {
        path: ["width"],
        message: "Breedte mag niet groter zijn dan de maximale breedte.",
    })
    .refine((data) => data.height <= data.maxHeight, {
        path: ["height"],
        message: "Hoogte mag niet groter zijn dan de maximale hoogte.",
    });

export type NewRoomFormValues = z.infer<typeof newRoomSchema>;

export const updateRoomSchema = newRoomSchema.and(idSchema)

export type UpdateRoomFormValues = z.infer<typeof updateRoomSchema>;