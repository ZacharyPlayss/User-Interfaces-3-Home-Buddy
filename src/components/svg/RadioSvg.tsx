import {type SVGProps} from "react"
import {useTheme} from "@mui/material";

interface RadioProps extends SVGProps<SVGSVGElement> {
    playlist:string,
    volume:number;
}

export function RadioSvg({volume,playlist,...props}:RadioProps){
    const theme = useTheme();
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 308 119"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            style={{
                fillRule: "evenodd",
                clipRule: "evenodd",
                strokeLinejoin: "round",
                strokeMiterlimit: 2,
            }}
            {...props}
        >
            <path
                d="M234.789,63.086l-0,47.396c-0,3.27 -2.655,5.925 -5.925,5.925l-150.528,-0c-3.27,-0 -5.925,-2.655 -5.925,-5.925l0,-47.396c0,-3.27 2.655,-5.925 5.925,-5.925l150.528,0c3.27,0 5.925,2.655 5.925,5.925Z"
                style={{
                    fill: "#3c3c3c",
                }}
            />
            <g id="Volume_controls">
                <path
                    d="M223.817,103.57l0,3.511c0,0.242 -0.197,0.439 -0.439,0.439l-29.842,0c-0.242,0 -0.439,-0.197 -0.439,-0.439l0,-3.511c0,-0.242 0.197,-0.439 0.439,-0.439l29.842,0c0.242,0 0.439,0.197 0.439,0.439Z"
                    style={{
                        fill: (volume > 0 )? theme.palette.primary.main : "#6D6D6D",
                    }}
                />
                <path
                    d="M223.817,97.646l0,3.511c0,0.242 -0.197,0.438 -0.439,0.438l-29.842,0c-0.242,0 -0.439,-0.196 -0.439,-0.438l0,-3.511c0,-0.242 0.197,-0.439 0.439,-0.439l29.842,-0c0.242,-0 0.439,0.197 0.439,0.439Z"
                    style={{
                        fill: (volume > 20 )? theme.palette.primary.main : "#6D6D6D",
                    }}
                />
                <path
                    d="M223.817,91.721l0,3.511c0,0.242 -0.197,0.439 -0.439,0.439l-29.842,-0c-0.242,-0 -0.439,-0.197 -0.439,-0.439l0,-3.511c0,-0.242 0.197,-0.439 0.439,-0.439l29.842,0c0.242,0 0.439,0.197 0.439,0.439Z"
                    style={{
                        fill: (volume > 40 )? theme.palette.primary.main : "#6D6D6D",
                    }}
                />
                <path
                    d="M223.817,85.797l0,3.51c0,0.243 -0.197,0.439 -0.439,0.439l-29.842,0c-0.242,0 -0.439,-0.196 -0.439,-0.439l0,-3.51c0,-0.243 0.197,-0.439 0.439,-0.439l29.842,-0c0.242,-0 0.439,0.196 0.439,0.439Z"
                    style={{
                        fill: (volume > 60 )? theme.palette.primary.main : "#6D6D6D",
                    }}
                />
                <path
                    d="M223.817,79.872l0,3.511c0,0.242 -0.197,0.439 -0.439,0.439l-29.842,-0c-0.242,-0 -0.439,-0.197 -0.439,-0.439l0,-3.511c0,-0.242 0.197,-0.439 0.439,-0.439l29.842,0c0.242,0 0.439,0.197 0.439,0.439Z"
                    style={{
                        fill: (volume > 80 )? theme.palette.primary.main : "#6D6D6D",
                    }}
                />
            </g>
            <path
                id="playlist_container"
                d="M190.903,70.044l-0,33.721c-0,2.326 -1.889,4.215 -4.215,4.215l-101.284,-0c-2.327,-0 -4.215,-1.889 -4.215,-4.215l-0,-33.721c-0,-2.327 1.888,-4.215 4.215,-4.215l101.284,-0c2.326,-0 4.215,1.888 4.215,4.215Z"
                style={{
                    fill: "#6d6d6d",
                }}
            />
            <text x="85" y="79" fill="white" fontSize="10px" fontFamily="Arial">
                <tspan x="85" dy="0">{playlist.substring(0,15)}</tspan>
                <tspan x="85" dy="12">{playlist.substring(15,30)}</tspan>
                <tspan x="85" dy="12">{playlist.substring(30,45)}</tspan>
            </text>
            <g>
                <path
                    d="M65.829,6.583l-0,105.326c-0,3.633 -2.95,6.582 -6.583,6.582l-52.663,0c-3.633,0 -6.583,-2.949 -6.583,-6.582l-0,-105.326c-0,-3.633 2.95,-6.583 6.583,-6.583l52.663,0c3.633,0 6.583,2.95 6.583,6.583Z"
                    style={{
                        fill: "#3d3c3b",
                    }}
                />
                <g>
                    <circle
                        cx={32.914}
                        cy={32.914}
                        r={21.943}
                        style={{
                            fill: "#6f6d6d",
                        }}
                    />
                    <circle
                        cx={32.914}
                        cy={32.914}
                        r={18.102}
                        style={{
                            fill: "#3d3c3b",
                        }}
                    />
                </g>
                <g>
                    <circle
                        cx={32.914}
                        cy={85.577}
                        r={21.943}
                        style={{
                            fill: "#6f6d6d",
                        }}
                    />
                    <circle
                        cx={32.914}
                        cy={85.577}
                        r={18.102}
                        style={{
                            fill: "#3d3c3b",
                        }}
                    />
                </g>
            </g>
            <g>
                <path
                    d="M307.2,6.583l-0,105.326c-0,3.633 -2.95,6.582 -6.583,6.582l-52.663,0c-3.633,0 -6.583,-2.949 -6.583,-6.582l0,-105.326c0,-3.633 2.95,-6.583 6.583,-6.583l52.663,0c3.633,0 6.583,2.95 6.583,6.583Z"
                    style={{
                        fill: "#3d3c3b",
                    }}
                />
                <g>
                    <circle
                        cx={274.286}
                        cy={32.914}
                        r={21.943}
                        style={{
                            fill: "#6f6d6d",
                        }}
                    />
                    <circle
                        cx={274.286}
                        cy={32.914}
                        r={18.102}
                        style={{
                            fill: "#3d3c3b",
                        }}
                    />
                </g>
                <g>
                    <circle
                        cx={274.286}
                        cy={85.577}
                        r={21.943}
                        style={{
                            fill: "#6f6d6d",
                        }}
                    />
                    <circle
                        cx={274.286}
                        cy={85.577}
                        r={18.102}
                        style={{
                            fill: "#3d3c3b",
                        }}
                    />
                </g>
            </g>
        </svg>
    )
}