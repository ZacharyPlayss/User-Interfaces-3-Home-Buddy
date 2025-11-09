import {FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import {type NewRoomFormValues} from "../../../../schemas/newRoomSchema.ts";
import type {Floor} from "../../../../model/Floor.ts";

interface RoomFormFieldsProps {
    floors: Floor[],
}

export function RoomFormFields({floors}: RoomFormFieldsProps) {
    const {register, control, formState: {errors}} = useFormContext<NewRoomFormValues>();

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

            <Controller
                name="floorId"
                control={control}
                render={({field, fieldState}) => (
                    <FormControl fullWidth
                                 sx={{mb: 2}}
                                 error={!!fieldState.error}>
                        <InputLabel id="floor-label">Verdieping</InputLabel>
                        <Select
                            labelId="floor-label"
                            id="floor"
                            label="Floor"
                            {...field}
                            onChange={(e) => {
                                field.onChange(e.target.value);
                            }
                            }
                        >
                            {floors.map((floor) => (
                                <MenuItem key={floor.id}
                                          value={floor.id}>
                                    {floor.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {fieldState.error && (
                            <FormHelperText>{fieldState.error.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />
            <Stack
                direction={"row"}
                gap={2}
            >
                <TextField
                    required
                    label="Breedte (in m)"
                    type="number"
                    fullWidth
                    sx={{mb: 2}}
                    error={!!errors.width}
                    helperText={errors.width?.message}
                    {...register("width", {valueAsNumber: true})}
                />
                <TextField
                    required
                    label="Hoogte (in m)"
                    type="number"
                    fullWidth
                    sx={{mb: 2}}
                    error={!!errors.height}
                    helperText={errors.height?.message}
                    {...register("height", {valueAsNumber: true})}
                />
            </Stack>
            <Stack
                direction={"row"}
                gap={2}
            >
                <TextField
                    required
                    label="X offset (in m)"
                    type="number"
                    fullWidth
                    sx={{mb: 2}}
                    error={!!errors.x}
                    helperText={errors.x?.message}
                    {...register("x", {valueAsNumber: true})}
                />
                <TextField
                    required
                    label="Y offset (in m)"
                    type="number"
                    fullWidth
                    sx={{mb: 2}}
                    error={!!errors.y}
                    helperText={errors.y?.message}
                    {...register("y", {valueAsNumber: true})}
                />
            </Stack>
        </>
    )

}