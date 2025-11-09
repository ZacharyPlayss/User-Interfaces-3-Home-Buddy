import {WallVisualizer} from "../WallVisualizer";
import {Typography, useTheme} from "@mui/material";
import "./RoomVisualizer.scss"
import {useCurrentSelectionStore} from "../../../store/currentSelectionStore.ts";
import type {ReactNode} from "react";


type RoomVisualizerProps = {
    name:string
    width:number,
    height:number,
    x?:number,
    y?:number,
    roomid:string,
    onClick?: () => void;
    showDomoticaControls?: boolean;
    children?: ReactNode;
};

export function RoomVisualizer({name, roomid, width,height,x=0,y=0, onClick, children}: RoomVisualizerProps) {
    const updateSelectedRoomId = useCurrentSelectionStore((state) => state.updateSelectedRoomId)
    const theme = useTheme();

    const wallWidth = 1;

    function handleClick(e: React.MouseEvent, roomId: string) {
        e.stopPropagation();
        updateSelectedRoomId(roomId)
        if (onClick) {
            onClick()
        }
    }

    return (
        <div
            className={"room-outer-container"}
            style={{
                width: `${width}rem`,
                height: `${height}rem`,
                top: `${y}rem`,
                left: `${x}rem`,
            }}
            onClick={(e) => handleClick(e, roomid)}
        >
            <Typography
                variant={"h4"}
                color={theme.palette.text.primary}
                className={"room-name"}
            >
                {name}
            </Typography>

            {children}

            <WallVisualizer width={`${wallWidth}rem`}
                            height={`${height}rem`}
                            positionX={"0rem"}
                            positionY={"0rem"}/>


            <WallVisualizer width={`${wallWidth}rem`}
                            height={`${height}rem`}
                            positionX={`${width - wallWidth}rem`}
                            positionY={"0rem"}/>

            <WallVisualizer width={`${width}rem`}
                            height={`${wallWidth}rem`}
                            positionX={"0rem"}
                            positionY={"0rem"}/>

            <WallVisualizer width={`${width}rem`}
                            height={`${wallWidth}rem`}
                            positionX={"0rem"}
                            positionY={`${height - wallWidth}rem`}/>

        </div>
    );
}
