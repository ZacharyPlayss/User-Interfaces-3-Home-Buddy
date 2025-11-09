import * as z from "zod";
import {idSchema} from "./idSchema.ts";
import {roomIncludesAudioDomoticaControl, roomIncludesHeaterDomoticaControl} from "../services/domoticaControlService.ts";
import {getRoom} from "../services/roomService.ts";
import {wallHeight, wallWidth} from "../components/Floorplan/RoomVisualizer";

export const typeSchema = z.discriminatedUnion("type", [
    z.object({
        type: z.literal("licht"),
        value: z.object({
            on_off: z.enum(["on", "off"], {message: "Moet een van de volgende waarden zijn: [on,off]"}),
            brightness: z.number().min(0, {message: "Brightness moet een waarde zijn van 0 t.e.m. 100"}).max(100, {message: "Brightness moet een waarde zijn van 0 t.e.m. 100"}),
        }),
        defaultValue: z.object({
            on_off: z.enum(["on", "off"], {message: "Moet een van de volgende waarden zijn: [on,off]"}),
            brightness: z.number().min(0, {message: "Brightness moet een waarde zijn van 0 t.e.m. 100"}).max(100, {message: "Brightness moet een waarde zijn van 0 t.e.m. 100"}),
        })
    }),
    z.object({
        type: z.literal("verwarming"),
        value: z.object({
            temperature: z.number().min(10, {message: "Temperatuur moet een waarde zijn van 10 t.e.m. 30"}).max(30, {message: "Temperatuur moet een waarde zijn van 10 t.e.m. 30"}),
        }),
        defaultValue: z.object({
            temperature: z.number().min(10, {message: "Temperatuur moet een waarde zijn van 10 t.e.m. 30"}).max(30, {message: "Temperatuur moet een waarde zijn van 10 t.e.m. 30"}),
        })
    }),
    z.object({
        type: z.literal("deurslot"),
        value: z.object({
            open_closed: z.enum(["open", "closed"], {message: "Moet een van volgende waarden zijn: [open,closed]"})
        }),
        defaultValue: z.object({
            open_closed: z.enum(["open", "closed"], {message: "Moet een van volgende waarden zijn: [open,closed]"})
        })
    }),
    z.object({
        type: z.literal("audio"),
        value: z.object({
            playlist: z.string().min(1, {message: "playlist moet minstens 1 karakter lang zijn."}).max(50, {message: "playlist moet maximum 50 karakter lang zijn."}),
            volume: z.number().min(0, {message: "Volume moet een waarde zijn van 0 t.e.m. 20"}).max(20, {message: "Volume moet een waarde zijn van 0 t.e.m. 20"}),
        }),
        defaultValue: z.object({
            playlist: z.string().min(1, {message: "playlist moet minstens 1 karakter lang zijn."}).max(50, {message: "playlist moet maximum 50 karakter lang zijn."}),
            volume: z.number().min(0, {message: "Volume moet een waarde zijn van 0 t.e.m. 20"}).max(20, {message: "Volume moet een waarde zijn van 0 t.e.m. 20"}),
        })
    })
])

export const newDomoticaControlSchema = z.object({
    name: z.string().min(1, {message: "Naam moet minstens 1 karakter lang zijn."}).max(100, {message: "Naam mag niet langer dan 100 karakters zijn."}),
    upcCode: z.string().length(13, {message: "Upccode moet 13 karakters lang zijn."}).regex(/^\d*$/, {message: "upc code mag alleen nummers bevatten."}),
    x: z.number().nonnegative({message: "X kan niet negatief zijn."}),
    y: z.number().nonnegative({message: "Y kan niet negatief zijn."}),
    description: z.string().optional(),
    roomId: z.string()
}).and(typeSchema)
    .refine(
        async (data) => {
            if (data.type === "deurslot") {
                const room = await getRoom(data.roomId);
                const xPosNewControl = data.x;
                const yPosNewControl = data.y;
                return xPosNewControl === 0 || xPosNewControl === (room.width - wallWidth) || yPosNewControl === 0 || yPosNewControl === (room.height - wallHeight);
            }
            return true;
        },
        {
            message: "Een slot kan enkel op een muur bevestigd worden.",
            path: ["type"],
        }
    )

export const newDomoticaControlSchemaWithCustomRestrictions = newDomoticaControlSchema.refine(
    async (data) => {
        if (data.type === "audio") {
            const hasAudio = await roomIncludesAudioDomoticaControl(data.roomId);
            return !hasAudio;
        }
        return true;
    },
    {
        message: "Deze kamer bevat reeds een 'audio control', er geldt een max van 1 per kamer.",
        path: ["type"],
    }
).refine(
    async (data) => {
        if (data.type === "verwarming") {
            const hasHeater = await roomIncludesHeaterDomoticaControl(data.roomId);
            return !hasHeater;
        }
        return true;
    },
    {
        message: "Deze kamer bevat reeds een 'heater control', er geldt een max van 1 per kamer.",
        path: ["type"],
    }
)

export type NewDomoticaControlFormValues = z.infer<typeof newDomoticaControlSchema>;

//update schema
export const updateDomoticaControlSchema = newDomoticaControlSchema
    .and(idSchema)
    .refine(
        async (data) => {
            if (data.type === "audio") {
                const hasAudio = await roomIncludesAudioDomoticaControl(data.roomId, {
                    excludeControl: true,
                    domoticaControlId: data.id
                });
                return !hasAudio;
            }
            return true;
        },
        {
            message: "Deze kamer bevat reeds een 'audio control', er geldt een max van 1 per kamer.",
            path: ["type"],
        }
    )
    .refine(
        async (data) => {
            if (data.type === "verwarming") {
                const hasHeater = await roomIncludesHeaterDomoticaControl(data.roomId, {
                    excludeControl: true,
                    domoticaControlId: data.id
                });
                return !hasHeater;
            }
            return true;
        },
        {
            message: "Deze kamer bevat reeds een 'heater control', er geldt een max van 1 per kamer.",
            path: ["type"],
        }
    )

export type UpdateDomoticaControlFormValues = z.infer<typeof updateDomoticaControlSchema>;
