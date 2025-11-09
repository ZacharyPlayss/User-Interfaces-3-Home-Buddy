import * as z from 'zod'
import {doesFloorExist} from "../services/floorService.ts";
import {idSchema} from "./idSchema.ts";

export const newFloorSchema= z.object({
    name:z.string().min(1, {message:"Naam moet minstens 1 karakter lang zijn."}).max(100, {message:"Naam mag niet langer zijn dan 100 karakters."}),
    description: z.string().optional(),
    width:z.number().nonnegative({message:"Breedte kan niet negatief zijn."}),
    height:z.number().nonnegative({message:"Hoogte kan niet negatief zijn."}),
    x:z.number().nonnegative({message:"X kan niet negatief zijn."}),
    y:z.number().nonnegative({message:"Y kan niet negatief zijn."}),
    level: z.number()
}).refine(
    async(data) => {
        const exists = await doesFloorExist(data.level);
        return !exists;
    },
    {
        message:"floor is already in use.",
        path:["level"],
    }
)
export type NewFloorFormValues = z.infer<typeof newFloorSchema>;

//UpdatefloorSchema is a completely new schema and not made with the "idSchema" due to the
// refinement rules required on newFloor that are non-required on update.
export const updateFloorSchema= z.object({
    name:z.string().min(1).max(100),
    description: z.string().optional(),
    width:z.number().nonnegative({message:"Breedte kan niet negatief zijn."}),
    height:z.number().nonnegative({message:"Hoogte kan niet negatief zijn."}),
    x:z.number().nonnegative({message:"X kan niet negatief zijn."}),
    y:z.number().nonnegative({message:"Y kan niet negatief zijn."}),
    level: z.number()
}).and(idSchema)
export type UpdateFloorFormValues = z.infer<typeof updateFloorSchema>;
