import {Card, Typography} from "@mui/material";
import dayjs from "dayjs";

interface TimeValueCardProps {
    start: Date;
    end: Date;
}

export function TimeValueCard({start, end}: TimeValueCardProps) {
    const formattedStart = dayjs(start).format("HH:mm");
    const formattedEnd = dayjs(end).format("HH:mm");
    return (
        <Card
            sx={(theme) =>
                ({
                    mr:1,
                    background:theme.palette.primary.main,
                    p:1
                })}
        >
            <Typography color="white">{formattedStart} - {formattedEnd}</Typography>
        </Card>
    )
}
