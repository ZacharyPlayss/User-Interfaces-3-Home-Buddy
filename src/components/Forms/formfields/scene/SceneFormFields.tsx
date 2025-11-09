import {Button, Divider, FormControl, FormControlLabel, FormHelperText, Stack, Switch, TextField, Typography} from "@mui/material";
import {Controller, useFieldArray, useFormContext} from "react-hook-form";
import type {NewSceneSchemaFormValues} from "../../../../schemas/sceneSchema.ts";
import {SceneControlItem} from "../sharedInputs/SceneControlItem.tsx";
import {useDomoticaControls} from "../../../../hooks/data/get/useDomoticaControls.tsx";
import {parseTimeToUTCDate} from "../../../../helpers/converters/dateConverter.ts";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {RequiresUserBoundary} from "../../../Boundary";

dayjs.extend(utc);

export function SceneFormFields() {
    const {domoticaControls} = useDomoticaControls()
    const {register, control, watch, formState: {errors}} = useFormContext<NewSceneSchemaFormValues>();
    const {fields, append, remove} = useFieldArray({control, name: "controls"})
    const {fields: automationsFields, append: automationsAppend, remove: automationsRemove} = useFieldArray({
        control,
        name: "automations"
    })
    const wantsToAddAutomations = watch("isAutomated");

    return (
        <>
            <TextField
                required
                label="Naam"
                type="text"
                fullWidth
                sx={{mb: 2}}
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name", {valueAsNumber: false})}
            />
            <TextField
                label="Beschrijving"
                type="text"
                fullWidth
                sx={{mb: 2}}
                error={!!errors.description}
                helperText={errors.description?.message}
                {...register("description", {valueAsNumber: false})}
            />
            <TextField
                label="Afbeelding"
                type="text"
                fullWidth
                sx={{mb: 2}}
                error={!!errors.image}
                helperText={errors.image?.message}
                {...register("image", {valueAsNumber: false})}
            />

            <RequiresUserBoundary requiredRole={"admin"}>
                <Controller
                    name="isAutomated"
                    control={control}
                    render={({field, fieldState}) => (
                        <FormControl sx={{mb: 2}}
                                     error={!!fieldState.error}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                }
                                label="Tijdstippen instellen voor automatische configuratie?"
                            />
                            {fieldState.error && (
                                <FormHelperText>{fieldState.error.message}</FormHelperText>
                            )}
                        </FormControl>
                    )}
                />
                {wantsToAddAutomations &&
                    <>
                        <Stack
                            divider={<Divider orientation="horizontal"
                                              flexItem/>}
                            direction={"column"}
                            gap={2}
                        >
                            {automationsFields.map((field, index) => (
                                <>
                                    <Stack
                                        key={field.id}
                                        direction={"row"}
                                        gap={2}
                                    >
                                        <Controller
                                            name={`automations.${index}.start`}
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    label="starttijd"
                                                    type="time"
                                                    fullWidth
                                                    value={dayjs(field.value).local().format("HH:mm")}
                                                    onChange={e => field.onChange(parseTimeToUTCDate(e.target.value))}
                                                    error={!!errors.automations?.[index]?.start}
                                                    helperText={errors.automations?.[index]?.start?.message}
                                                />
                                            )}
                                        />
                                        <Controller
                                            name={`automations.${index}.end`}
                                            control={control}
                                            render={({field}) => (
                                                <TextField
                                                    label="eindtijd"
                                                    type="time"
                                                    fullWidth
                                                    value={dayjs(field.value).local().format("HH:mm")}
                                                    onChange={e => field.onChange(parseTimeToUTCDate(e.target.value))}
                                                    error={!!errors.automations?.[index]?.end}
                                                    helperText={errors.automations?.[index]?.end?.message}
                                                />
                                            )}
                                        />
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            sx={{px: 4}}
                                            onClick={() => automationsRemove(index)}
                                        >
                                            Verwijder
                                        </Button>
                                    </Stack>
                                    {errors.automations?.[index] && typeof errors.automations[index].message === "string" && (
                                        <FormHelperText error
                                                        sx={{mt: -1}}>
                                            {errors.automations[index].message}
                                        </FormHelperText>
                                    )}
                                </>
                            ))}
                        </Stack>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{mt: 2, mb: 2}}
                            onClick={() =>
                                automationsAppend({
                                    start: new Date(),
                                    end: new Date(Date.now() + 3600 * 1000),
                                })
                            }
                        >
                            Extra tijdstip toevoegen
                        </Button>

                    </>
                }
            </RequiresUserBoundary>

            <Typography variant={"h6"}
                        sx={{mb: 1}}>Apparaten waarover de scene controle heeft</Typography>

            <Stack
                divider={<Divider orientation="horizontal"
                                  flexItem/>}
                direction={"column"}
                gap={2}
            >
                {fields.map((field, index) => (
                    <SceneControlItem
                        key={"control" + field.id + index}
                        index={index}
                        field={field}
                        onRemove={remove}
                    />
                ))}
            </Stack>

            <Button
                variant="contained"
                color="primary"
                sx={{mt: 2}}
                onClick={() =>
                    append({
                        id: domoticaControls?.[0].id ?? '',
                        controlType: domoticaControls?.[0].type ?? 'licht',
                        value: domoticaControls?.[0].value ?? {on_off: "off", brightness: 100},
                    })
                }
            >
                Apparaat toevoegen
            </Button>

        </>
    )

}