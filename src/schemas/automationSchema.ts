import * as z from "zod";

export const newAutomationSchema = z.object({
    start: z.date(),
    end: z.date(),
})
export type NewAutomationFormValues = z.infer<typeof updateAutomationSchema>;

export const updateAutomationSchema = z.object({
    id: z.string(),
    start: z.date(),
    end: z.date(),
    sceneId: z.string(),
    isEnabled: z.boolean(),
    isInterrupted: z.boolean(),
})

export type UpdateAutomationFormValues = z.infer<typeof updateAutomationSchema>;
