import {useState} from "react";
import type {WallVisualizerProps} from "./WallVisualizer.tsx";

export function WallWithDoorVisualizer({width, height, positionX, positionY, doorRotation}: WallVisualizerProps) {
    const [isDoorOpen] = useState(false);
    return (
        <div
            style={{
                background: "blue",
                position: "absolute",
                width: width,
                height: height,
                top: positionY,
                left: positionX,
                transform:`rotate(${doorRotation}deg)`
            }}
        >
            {isDoorOpen &&
                <div
                    style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-70%, -36%) rotate(-45deg)",
                        background: "conic-gradient(blue 135deg 0deg, transparent 135deg 360deg)",
                        maskImage:
                            "radial-gradient(circle, transparent 60%, black 31% 70%, transparent 71%)",
                        maskComposite: "intersect",
                    }}
                />
            }

            <div
                className={isDoorOpen ? "door-open" : "door-close"}
                style={{
                    background: "blue",
                    width: "75px",
                    height: "15px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: `translate(-90%, -50%) rotate(${isDoorOpen ? 45 : 90}deg)`,
                    transformOrigin: "bottom center",
                }}
            />
        </div>
    );
}