import {Skeleton} from "@mui/material";


export function SceneCardLoadingFallback() {
    return (
        <>
            <Skeleton
                variant={"rectangular"}
                sx={{minWidth: 300, mt:2, position:"relative", minHeight:500}}
            />
        </>
    )
}