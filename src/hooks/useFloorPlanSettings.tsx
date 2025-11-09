import {useLocalStorage} from 'usehooks-ts'
import type {FloorPlanMode} from "../config/floorplan";

export function useFloorPlanSettings(){
    const [currentSetting, setCurrentSetting] = useLocalStorage<FloorPlanMode>("floorplanViewerMode","3D")

    return{
        currentSetting,
        setCurrentSetting
    }
}