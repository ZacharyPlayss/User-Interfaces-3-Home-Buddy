import {Card, IconButton, type SxProps, type Theme} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {DeviceControls} from "../DeviceControls";
import {useDomoticaControl} from "../../hooks/data/get/single/useDomoticaControl.tsx";
import {motion} from "motion/react";

type QuickControlProps = {
    sx?: SxProps<Theme>
    domoticaControlId: string;
    setDomoticaControlId: (id: string | null) => void;
    style?: React.CSSProperties
}

const MotionCard = motion.create(Card)

export function DomoticaControlInformationCard({sx, domoticaControlId, setDomoticaControlId, style}: QuickControlProps) {
    const {domoticaControl} = useDomoticaControl(domoticaControlId);
    return <MotionCard
        sx={{
            position: "relative",
            height: "100%",
            ...sx
        }}
        style={style}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
        <IconButton sx={{position: "absolute", top: 1, right: 1, zIndex: 12}}
                    onClick={() => setDomoticaControlId(null)}>
            <CloseIcon/>
        </IconButton>
        <DeviceControls domoticaControl={domoticaControl}/>
    </MotionCard>;
}



