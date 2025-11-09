interface LampSvgProps{
    isOn: boolean;
    brightness:number
}

export function LampSvg({isOn, brightness}:LampSvgProps){
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
            viewBox="0 0 178 203"
        >
            <defs>
                <radialGradient id="lampGlowGradient" cx="50%" cy="0%" r="50%">
                    <stop offset="0%" stopColor="rgba(255,255,180,0.6)" />
                    <stop offset="40%" stopColor="rgba(255,255,180,0.3)" />
                    <stop offset="70%" stopColor="rgba(255,255,150,0.1)" />
                    <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <filter id="blurGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="10" />
                </filter>
            </defs>
            <path
                d="M28.8 102 0 202.8h177.6l-24-100.8H28.8Z"
                fill="url(#lampGlowGradient)"
                filter="url(#blurGlow)"
                style={{
                    opacity: isOn ? brightness : 0,
                }}
            />
            <ellipse
                cx={91.2}
                cy={100.8}
                rx={62.4}
                ry={7.2}
                style={{
                    fill: isOn ?  "#fffd9a":"#494747" ,
                }}
            />
            <path
                d="m105.462 62.861.138.001c4.1 2.233 6.843 5.144 8.382 8.657L72 71.265c1.452-3.993 4.627-6.89 9.6-8.643l.155.002L84 31.2 86.4 0h14.4l2.4 31.2 2.262 31.661Z"
                style={{
                    fill: "#272626",
                }}
            />
            <path
                d="M28.8 100.8c45.698-7.946 105.793-5.069 124.8 0l-15.015-25.2c-29.715-9.357-60.811-9.052-92.985-1.2l-16.8 26.4Z"
                style={{
                    fill: "#1e1e1d",
                }}
            />
        </svg>
    )
}
