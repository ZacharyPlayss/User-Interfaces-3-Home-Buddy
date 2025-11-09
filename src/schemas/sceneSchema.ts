import * as z from "zod";
import {idSchema} from "./idSchema.ts";
import {newAutomationSchema, updateAutomationSchema} from "./automationSchema.ts";
import {getAllAutomations} from "../services/automationService.ts";
import {checkDateRangeOverlap, convertDateToUTC} from "../helpers/converters/dateConverter.ts";

const SceneControlValueSchema = z.object({
    id: z.string(),
    controlType: z.enum(["licht","verwarming","deurslot","audio"]),
    value: z.union(
        [
            z.object({
                on_off: z.enum(["on","off"], {message:"Moet een van de volgende waarden zijn: [on,off]"}),
                brightness: z.number().min(0,{message:"Brightness moet een waarde zijn van 0 t.e.m. 100"}).max(100,{message:"Brightness moet een waarde zijn van 0 t.e.m. 100"}),
            }),
            z.object({
                temperature: z.number().min(10,{message:"Temperatuur moet een waarde zijn van 10 t.e.m. 30"}).max(30,{message:"Temperatuur moet een waarde zijn van 10 t.e.m. 30"}),
            }),
            z.object({
                open_closed:z.enum(["open","closed"], {message:"Moet een van volgende waarden zijn: [open,closed]"})
            }),
            z.object({
                playlist:z.string().min(1, {message:"playlist moet minstens 1 karakter lang zijn."}).max(50,{message:"playlist moet maximum 50 karakter lang zijn."}),
                volume:z.number().min(0, {message:"Volume moet een waarde zijn van 0 t.e.m. 100"}).max(100,{message:"Volume moet een waarde zijn van 0 t.e.m. 100"}),

            }),
        ]
    )
})

export const sceneSchema= z.object({
    name:z.string().min(1, {message:"Naam moet minstens 1 karakter lang zijn."}).max(100, {message:"Naam mag niet langer zijn dan 100 karakters."}),
    description: z.string().optional(),
    enabled: z.boolean(),
    isGlobal:z.boolean(),
    image:z.url({message:"Image moet een geldige url zijn of leeg."}).or(z.literal("")).optional(),
    controls: z.array(SceneControlValueSchema),
    isAutomated: z.boolean(),
})

export const newSceneSchema = sceneSchema.extend({
    automations: z.array(newAutomationSchema),
}).superRefine(async (data, ctx) => {
    if (data.isAutomated) {
        const automations = await getAllAutomations();

        for (let i = 0; i < data.automations.length; i++) {
            const requested = data.automations[i];
            for (const existing of automations) {
                if (checkDateRangeOverlap(
                    convertDateToUTC(requested.start),
                    convertDateToUTC(requested.end),
                    existing.start,
                    existing.end
                )) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Dit tijdsinterval overlapt met een al geplande scene.",
                        path: ["automations", i],
                    });
                }
            }
        }
    }
});

export type NewSceneSchemaFormValues = z.infer<typeof newSceneSchema>;

export const updateSceneSchema = sceneSchema
    .extend({
        automations:z.array(updateAutomationSchema)
    })
    .and(idSchema)
    .superRefine(async (data, ctx) => {
        if (data.isAutomated) {
            const automations = await getAllAutomations();

            for (let i = 0; i < data.automations.length; i++) {
                const requested = data.automations[i];
                for (const existing of automations) {
                    if (checkDateRangeOverlap(
                        convertDateToUTC(requested.start),
                        convertDateToUTC(requested.end),
                        existing.start,
                        existing.end
                    )) {
                        ctx.addIssue({
                            code: "custom",
                            message: "Dit tijdsinterval overlapt met een al geplande scene.",
                            path: ["automations", i],
                        });
                    }
                }
            }
        }
    });


export type UpdateSceneSchemaFormValues = z.infer<typeof updateSceneSchema>;