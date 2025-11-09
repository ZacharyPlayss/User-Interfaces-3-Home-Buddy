import type {SVGProps} from "react"
import {motion} from "motion/react"

export function FloorPlanLoadingSvg(props: SVGProps<SVGSVGElement>){
    const animationDuration = 5;
return(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinejoin: "round",
            strokeMiterlimit: 2,
        }}
        viewBox="0 0 180 180"
        {...props}
    >
        <path
            id={"house"}
            d="m55.169 64.899 37.2-37.2 37.2 37.2v74.4h-74.4v-74.4Z"
            style={{
                fill: "#1e1e1d",
            }}
        />
        <motion.path
            id={"circles"}
            d="M91.169 177.699c-49.532 0-89.895-39.572-91.169-88.8h14.369c1.267 37.928 38.566 74.4 76.8 74.4v14.4ZM68.186 3.125c47.844-12.82 97.074 14.958 111.045 62.178l-13.879 3.719c-11.04-36.308-56.508-61.883-93.439-51.988L68.186 3.125Z"
            style={{
                fill: "#1e1e1d",
            }}
            animate={{
                rotate: [0,360 ]
            }}
            transition={{
                duration: animationDuration,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                times: [0,  1],
            }}
        />
    </svg>
)}
