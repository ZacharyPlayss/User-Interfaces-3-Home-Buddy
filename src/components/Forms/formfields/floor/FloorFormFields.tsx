import {Stack, TextField} from "@mui/material";
import {useFormContext} from "react-hook-form";
import type {NewFloorFormValues} from "../../../../schemas/floorSchema.ts";

export function FloorFormFields() {
    const {register, formState: {errors}} = useFormContext<NewFloorFormValues>();
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
                required
                label="Niveau"
                type="number"
                fullWidth
                sx={{mb: 2}}
                error={!!errors.level}
                helperText={errors.level?.message}
                {...register("level", {valueAsNumber: true})}
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