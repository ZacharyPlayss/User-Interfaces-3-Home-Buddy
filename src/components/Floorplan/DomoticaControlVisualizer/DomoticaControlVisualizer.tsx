import {type ReactNode} from "react";
import './DomoticaControlVisualizer.scss'
import {useCurrentSelectionStore} from "../../../store/currentSelectionStore.ts";

type DomoticaControlVisualizer = {
    domoticaControlId: string
    positionY: number;
    positionX: number;
    onClick?: () => void;
    icon: ReactNode;
    isSelected?: boolean;
};

export function DomoticaControlVisualizer({
                                              domoticaControlId,
                                              positionY,
                                              positionX,
                                              icon
                                          }: DomoticaControlVisualizer) {
    const selectedDomoticaControlId = useCurrentSelectionStore((state) => state.selectedDomoticaControlId)
    const updateSelectedDomoticaControlId = useCurrentSelectionStore((state) => state.updateSelectedDomoticaControlId)

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        updateSelectedDomoticaControlId(domoticaControlId);
    };

    return (
        <>
            <div
                className={selectedDomoticaControlId === domoticaControlId?"domoticacontrol-outer-circle-base domoticacontrol-outer-circle-color":"domoticacontrol-outer-circle-base"}
                style={{
                    top: `${positionY}rem`,
                    left: `${positionX}rem`,
                }}
                onClick={(e) => handleClick(e)}
            >
                <div
                    className={"domoticacontrol-inner-circle"}
                >
                    {icon}
                </div>
            </div>
        </>
    )
}