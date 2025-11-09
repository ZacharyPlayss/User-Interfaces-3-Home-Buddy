import Lightbulb from '@mui/icons-material/Lightbulb';
import Whatshot from '@mui/icons-material/Whatshot';
import Lock from '@mui/icons-material/Lock';
import VolumeUp from '@mui/icons-material/VolumeUp';
import type {SvgIconProps} from "@mui/material";


export type DomoticaControlType = "licht"|"verwarming"|"deurslot"|"audio";


export const domoticaControlTypeIconMap: Record<string, React.ComponentType<SvgIconProps>> = {
    licht: Lightbulb,
    verwarming: Whatshot,
    deurslot: Lock,
    audio: VolumeUp,
};