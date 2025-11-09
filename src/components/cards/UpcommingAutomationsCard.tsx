import {Box, Card, CardContent, type SxProps, type Theme, Typography} from "@mui/material";
import {HorizontalAutomationCard} from "./horizontal/HorizontalAutomationCard.tsx";
import type {Automation} from "../../model/Automation.ts";
import {sortAutomations} from "../../helpers/sorters/automationSorter.ts";

type muiSxProp = {
    sx?: SxProps<Theme>,
    automations: Automation[]
}

export function UpcommingAutomationsCard({sx, automations}: muiSxProp) {
    const sortedAutomations = sortAutomations(automations);
    return (
        <>
            <Card sx={{
                ...sx,
                pointerEvents: "initial"
            }}>
                <CardContent>
                    {sortedAutomations.length != 0 ?
                        <>
                            <Typography gutterBottom
                                        variant="h6"
                                        component="div">
                                Aankomende geplande scenes
                            </Typography>
                            <Box sx={{maxHeight: 200, overflowY: "auto"}}>
                                {sortedAutomations.slice(0, 2).map((automation) =>
                                    <HorizontalAutomationCard key={"automation"+automation.id} automationId={automation.id}/>
                                )}
                            </Box>
                        </>
                        :
                        <Typography gutterBottom
                                    variant="h6"
                                    component="div">
                            Er zijn nog geen scenes met een gepland tijdsinterval :'(
                        </Typography>
                    }


                </CardContent>
            </Card>
        </>
    )
}