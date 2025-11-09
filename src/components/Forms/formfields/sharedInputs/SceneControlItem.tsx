import {Button, FormControl, InputLabel, MenuItem, Select, Skeleton, Stack, TextField, Typography} from "@mui/material";
import {Controller, type FieldArrayWithId, useFormContext} from "react-hook-form";
import type {NewSceneSchemaFormValues} from "../../../../schemas/sceneSchema.ts";
import {useDomoticaControls} from "../../../../hooks/data/get/useDomoticaControls.tsx";
import {domoticaControlTypeDefaultValues} from "../../../../config/defaultValues";

interface SceneControlItemProps{
    field:FieldArrayWithId<NewSceneSchemaFormValues, "controls", "id">,
    index:number,
    onRemove: (index:number) => void
}

export function SceneControlItem({field,index,onRemove}: SceneControlItemProps){
    const {domoticaControls, isLoading} = useDomoticaControls()
    const {register, setValue, control,watch} = useFormContext();
    const type = watch(`controls.${index}.controlType`)


    return(
        <div key={field.id}
             className="control-group">

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 2, mt:2}}>
                <Typography variant="subtitle1">Control #{index + 1}</Typography>
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => onRemove(index)}
                >
                    Remove
                </Button>
            </Stack>

            {isLoading ? (
                <Skeleton
                    variant="rectangular"
                    height={56}
                    sx={{ mb: 2, borderRadius: 1 }}
                />
            ) : (
                <Controller
                    name={`controls.${index}.id`}
                    control={control}
                    render={({ field, fieldState }) => (
                        <FormControl fullWidth sx={{ mb: 2 }} error={!!fieldState.error}>
                            <InputLabel id={`control-select-label-${index}`}>Apparaat</InputLabel>
                            <Select
                                {...field}
                                onChange={(e) => {
                                    const selectedId = e.target.value as string;
                                    field.onChange(selectedId);
                                    const selectedControl = domoticaControls.find(c => c.id === selectedId);
                                    if (selectedControl) {
                                        setValue(`controls.${index}.controlType`, selectedControl.type);
                                        setValue(`controls.${index}.value`, domoticaControlTypeDefaultValues[selectedControl.type]);
                                    }
                                }}
                            >
                                {domoticaControls.map((control) => (
                                    <MenuItem key={control.id} value={control.id}>
                                        {control.name} ({control.type})
                                    </MenuItem>
                                ))}
                            </Select>
                            {fieldState.error && (
                                <p style={{ color: 'red', fontSize: '0.8rem' }}>{fieldState.error?.message}</p>
                            )}
                        </FormControl>
                    )}
                />
            )}

            {type === "licht" && (
                <>
                    <TextField
                        label="Helderheid"
                        type="number"
                        fullWidth
                        sx={{mb: 2}}
                        {...register(`controls.${index}.value.brightness`, {valueAsNumber: true})}
                    />
                    <Controller
                        name={`controls.${index}.value.on_off`}
                        control={control}
                        render={({field}) => (
                            <Select {...field} fullWidth>
                                <MenuItem value="on">On</MenuItem>
                                <MenuItem value="off">Off</MenuItem>
                            </Select>
                        )}
                    />
                </>
            )}

            {type === "verwarming" && (
                <TextField
                    label="Temperatuur"
                    type="number"
                    fullWidth
                    sx={{mb: 2}}
                    {...register(`controls.${index}.value.temperature`, {valueAsNumber: true})}
                />
            )}

            {type === "deurslot" && (
                <Controller
                    name={`controls.${index}.value.open_closed`}
                    control={control}
                    render={({field}) => (
                        <Select {...field} fullWidth>
                            <MenuItem value="open">Open</MenuItem>
                            <MenuItem value="closed">Closed</MenuItem>
                        </Select>
                    )}
                />
            )}

            {type === "audio" && (
                <>
                    <TextField
                        label="Afspeellijst"
                        type="text"
                        fullWidth
                        sx={{mb: 2}}
                        {...register(`controls.${index}.value.playlist`, {valueAsNumber: false})}
                    />
                    <TextField
                        label="volume"
                        type="text"
                        fullWidth
                        sx={{mb: 2}}
                        {...register(`controls.${index}.value.volume`, {valueAsNumber: true})}
                    />
                </>
            )}
        </div>
    )
}