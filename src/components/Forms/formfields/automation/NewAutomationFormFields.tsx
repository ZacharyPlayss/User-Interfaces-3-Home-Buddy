import {TextField} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import type {NewAutomationFormValues} from "../../../../schemas/automationSchema.ts";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function parseTimeToUTCDate(timeStr: string): Date {
    const now = dayjs();
    const localDateTime = dayjs(`${now.format("YYYY-MM-DD")}T${timeStr}`);
    return localDateTime.utc().toDate();
}

export function NewAutomationFormFields() {
    const {control, formState: {errors}} = useFormContext<NewAutomationFormValues>();
    return (
        <>
            <Controller
                name="start"
                control={control}

                render={({ field }) => (
                    <TextField
                        label="starttijd"
                        type="time"
                        fullWidth
                        value={dayjs(field.value).local().format("HH:mm")}
                        onChange={(e) => field.onChange(parseTimeToUTCDate(e.target.value))}
                        error={!!errors.start}
                        helperText={errors.start?.message}
                    />
                )}
            />
            <Controller
                name="end"
                control={control}
                render={({ field }) => (
                    <TextField
                        sx={{mt:2}}
                        label="eindtijd"
                        type="time"
                        fullWidth
                        value={dayjs(field.value).local().format("HH:mm")}
                        onChange={(e) => field.onChange(parseTimeToUTCDate(e.target.value))}
                        error={!!errors.end}
                        helperText={errors.end?.message}
                    />
                )}
            />
        </>
    )

}