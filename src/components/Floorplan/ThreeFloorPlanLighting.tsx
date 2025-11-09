import {useTheme} from "@mui/material";
import {AccumulativeShadows, Environment, Lightformer, RandomizedLight, Sphere} from "@react-three/drei";
import {BackSide} from "three";

export function ThreeFloorPlanLighting() {
    const theme = useTheme();

    return (
        <>
            <ambientLight intensity={0.3} color={theme.palette.background.default} />
            <AccumulativeShadows temporal frames={200} scale={1000} opacity={0.8} color={theme.palette.background.default}>
                <RandomizedLight
                    amount={12}
                    radius={20}
                    intensity={1}
                    ambient={0.25}
                    position={[0, 40, 0]}
                    bias={0.001}
                />
            </AccumulativeShadows>

            <Environment blur={0.7} background>
                <Sphere scale={60}>
                    <meshBasicMaterial
                        color={theme.palette.background.default}
                        side={BackSide}
                    />
                </Sphere>
                <Lightformer
                    position={[20, 5, -20]}
                    form="rect"
                    intensity={1}
                    color="#F0F0F0"
                    target={[0, 0, 0]}
                />

                <Lightformer
                    position={[-20, 5, 10]}
                    form="circle"
                    intensity={1}
                    color="#ffffff"
                    target={[0, 0, 0]}
                />

                <Lightformer
                    position={[0, 20, -10]}
                    form="ring"
                    intensity={0.8}
                    color="#ffffff"
                    target={[0, 0, 0]}
                />

                <Lightformer
                    position={[0, 10, 25]}
                    form="rect"
                    intensity={1}
                    color="#ffffff"
                    target={[0, 0, 0]}
                />
            </Environment>
        </>
    );
}