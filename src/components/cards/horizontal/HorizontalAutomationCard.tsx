import {Card, CardContent, CardMedia, Chip, Stack, Typography} from "@mui/material";
import {useAutomationWithScene} from "../../../hooks/data/chained/useAutomationWithScene.tsx";
import dayjs from 'dayjs';
import {NoImageFallback} from "../../fallbacks/NoImageFallback.tsx";

interface AutomationCardProps {
    automationId: string
}

export function HorizontalAutomationCard({automationId}: AutomationCardProps) {
    const {automation, scene} = useAutomationWithScene(automationId);

    return (
        <>
            <Card sx={{ display: "flex", alignItems: "center", minWidth: 300, p: 1, mt: 2 }}>
                {scene.image ?
                    <CardMedia
                        component="img"
                        height="194"
                        image={scene.image}
                        alt={scene.name}
                        sx={{
                            width: "100%",
                            maxWidth:150,
                            height: 150,
                            objectFit: "cover",
                            display: "block",
                            borderRadius: 0,
                        }}
                    />
                    :
                    <NoImageFallback width={150} height={150} name={scene.name}/>
                }
                <CardContent sx={{ flex: 1, px: 2, py: 1 }}>
                    <Stack direction={"row"}>
                        {automation.enabled ?
                            <Chip
                                label={"active"}
                                sx={(theme) => ({
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                })}
                            />
                            :
                            <Chip
                                label={"not active"}
                                sx={(theme) => ({
                                    backgroundColor: theme.palette.secondary.main,
                                    color: theme.palette.secondary.contrastText,
                                })}
                            />
                        }
                        {automation.isInterrupted &&
                            <Chip
                                label={"interrupted"}
                                sx={(theme) => ({
                                    backgroundColor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    ml:1
                                })}
                            />
                        }
                    </Stack>
                    <Typography variant="h6" noWrap>
                        {dayjs(automation.start).format('HH:mm')} - {dayjs(automation.end).format('HH:mm')}
                    </Typography>
                    <Typography noWrap>
                        {scene.name}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}