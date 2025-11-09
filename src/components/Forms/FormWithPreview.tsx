import {Box, Button, Divider, Stack, Typography} from "@mui/material";
import {type ReactNode, useState} from "react";
import {useMediaQueries} from "../../hooks/useMediaQueries.tsx";

interface FormWithPreviewProps{
    formFields: ReactNode,
    previewElement: ReactNode
}

export function FormWithPreview({ formFields, previewElement }: FormWithPreviewProps) {
    const {isSmallScreen} = useMediaQueries();
    const [showPreview, setShowPreview] = useState(false);

    const toggleView = () => setShowPreview((prev) => !prev);

    if (isSmallScreen) {
        return (
            <Box sx={{ width: "100%" }}>
                <Box sx={{ minHeight: 300 }}>
                    {showPreview ? previewElement : formFields}
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                    <Button variant="outlined" onClick={toggleView}>
                        {showPreview ? "<- Terug naar het formulier" : "Preview bekijken"}
                    </Button>
                </Box>
            </Box>
        );
    }
    return (
        <Stack
            direction="row"
            spacing={2}
            sx={{ width: "100%", minHeight: 300 }}
            divider={<Divider orientation="vertical" flexItem />}
        >
            <Box sx={{ flex: 1 }}>{formFields}</Box>
            <Box sx={{ flex: 1 }}>
                <Typography>
                    Preview
                </Typography>
                {previewElement}
            </Box>
        </Stack>
    );
}