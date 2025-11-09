import {FormControl, FormControlLabel, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Stack, Switch, TextField} from "@mui/material";
import {Controller, useFormContext} from "react-hook-form";
import type {NewDomoticaControlFormValues} from "../../../../schemas/domoticaControlSchema.ts";
import type {DomoticaControlType} from "../../../../model/DomoticaControlTypes.ts";
import type {Room} from "../../../../model/Room.ts";

interface DomoticaControlProps {
    rooms: Room[],
    type: DomoticaControlType,
    onTypeChange: () => void;
}

export function DomoticaControlFormFields({rooms, type, onTypeChange}: DomoticaControlProps) {
    const {register, control, formState: {errors}} = useFormContext<NewDomoticaControlFormValues>();
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
                name="roomId"
                control={control}
                render={({field, fieldState}) => (
                    <FormControl fullWidth
                                 sx={{mb: 2}}
                                 error={!!fieldState.error}>
                        <InputLabel id="room-label">Kamer</InputLabel>
                        <Select
                            labelId="room-label"
                            id="room"
                            label="room"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value)}
                        >
                            {rooms.map((room) => (
                                <MenuItem key={room.id}
                                          value={room.id}>
                                    {room.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {fieldState.error && (
                            <FormHelperText>{fieldState.error.message}</FormHelperText>
                        )}
                    </FormControl>
                )}
            />

            <Controller
                name="type"
                control={control}
                render={({field, fieldState}) => (
                    <FormControl fullWidth
                                 sx={{mb: 2}}
                                 error={!!fieldState.error}>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type"
                            label="Type"
                            {...field}
                            onChange={(e) => {
                                field.onChange(e.target.value)
                                onTypeChange();
                            }
                            }
                        >
                            <MenuItem value="licht">licht</MenuItem>
                            <MenuItem value="verwarming">verwarming</MenuItem>
                            <MenuItem value="deurslot">deurslot</MenuItem>
                            <MenuItem value="audio">audio</MenuItem>
                        </Select>
                        {fieldState.error && (
                            <p style={{color: 'red', fontSize: '0.8rem'}}>
                                {fieldState.error.message}
                            </p>
                        )}
                    </FormControl>
                )}
            />

            {type === "licht" &&
                <>
                    <Stack
                        direction={"row"}
                        gap={2}
                    >
                        <Controller
                            name="value.on_off"
                            control={control}
                            render={({field, fieldState}) => (
                                <FormControl sx={{mb: 2}}
                                             error={!!fieldState.error}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={field.value === "on"}
                                                onChange={(e) => field.onChange(e.target.checked ? "on" : "off")}
                                            />
                                        }
                                        label="Lamp aan"
                                    />
                                    {fieldState.error && (
                                        <FormHelperText>{fieldState.error.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="value.brightness"
                            control={control}
                            render={({field, fieldState}) => (
                                <FormControl fullWidth
                                             sx={{mb: 2}}
                                             error={!!fieldState.error}>
                                    <InputLabel htmlFor="amount">Helderheid</InputLabel>
                                    <OutlinedInput
                                        type={"number"}
                                        {...field}
                                        id="value.brightness"
                                        label="value.brightness"
                                        onChange={(e) => field.onChange(Number(e.target.value))}
                                    />
                                    {fieldState.error && (
                                        <p style={{color: "red", fontSize: "0.8rem"}}>
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Stack>
                </>
            }

            {type === "verwarming" &&
                <>
                    <Controller
                        name="value.temperature"
                        control={control}
                        defaultValue={0}
                        render={({field, fieldState}) => (
                            <FormControl fullWidth
                                         sx={{mb: 2}}
                                         error={!!fieldState.error}>
                                <InputLabel htmlFor="value.temperature">Temperatuur</InputLabel>
                                <OutlinedInput
                                    type={"number"}
                                    {...field}
                                    id="value.temperature"
                                    label="value.temperature"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                                {fieldState.error && (
                                    <p style={{color: "red", fontSize: "0.8rem"}}>
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </FormControl>
                        )}
                    />
                </>
            }

            {type === "deurslot" &&
                <>
                    <Controller
                        name="value.open_closed"
                        control={control}
                        render={({field, fieldState}) => (
                            <FormControl sx={{mb: 2}}
                                         error={!!fieldState.error}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={field.value === "closed"}
                                            onChange={(e) => field.onChange(e.target.checked ? "closed" : "open")}
                                        />
                                    }
                                    label="Op slot?"
                                />
                                {fieldState.error && (
                                    <FormHelperText>{fieldState.error.message}</FormHelperText>
                                )}
                            </FormControl>
                        )}
                    />

                </>
            }
            {type === "audio" &&
                <>
                    <Controller
                        name="value.playlist"
                        control={control}
                        render={({field, fieldState}) => (
                            <FormControl fullWidth
                                         sx={{mb: 2}}
                                         error={!!fieldState.error}>
                                <InputLabel htmlFor="value.playlist">Afspeellijst</InputLabel>
                                <OutlinedInput
                                    type={"text"}
                                    {...field}
                                    id="value.playlist"
                                    label="value.playlist"
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                                {fieldState.error && (
                                    <p style={{color: "red", fontSize: "0.8rem"}}>
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="value.volume"
                        control={control}
                        render={({field, fieldState}) => (
                            <FormControl fullWidth
                                         sx={{mb: 2}}
                                         error={!!fieldState.error}>
                                <InputLabel htmlFor="volume">Volume</InputLabel>
                                <OutlinedInput
                                    type={"number"}
                                    {...field}
                                    id="volume"
                                    label="volume"
                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                />
                                {fieldState.error && (
                                    <p style={{color: "red", fontSize: "0.8rem"}}>
                                        {fieldState.error.message}
                                    </p>
                                )}
                            </FormControl>
                        )}
                    />
                </>
            }

            <TextField
                required
                label="Upc Code"
                type="text"
                fullWidth
                sx={{mb: 2}}
                error={!!errors.upcCode}
                helperText={errors.upcCode?.message}
                {...register("upcCode", {valueAsNumber: false})}
            />

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