import {Suspense, useState} from "react";
import {Breadcrumbs, Card, Stack, Typography} from "@mui/material";
import {UpdateDomoticaControlDialog} from "../dialogs/domoticacontrol/UpdateDomoticaControlDialog.tsx";
import {useUpdateDomoticaControl} from "../../hooks/data/update/useUpdateDomoticaControl.tsx";
import {DeviceControls} from "../DeviceControls";
import {RequiresUserBoundary} from "../Boundary";
import {useNavigate} from "react-router-dom";
import type {DomoticaControl} from "../../model/DomoticaControl.ts";
import {ErrorBoundary} from "react-error-boundary";
import {DialogLoadingFallback} from "../fallbacks/loading/DialogLoadingFallback.tsx";
import {useDeleteDomoticaControl} from "../../hooks/data/delete/useDeleteDomoticaControl.tsx";
import {ConfirmationDialog} from "../dialogs/ConfirmationDialog.tsx";
import {useScenesByDomoticaControlId} from "../../hooks/data/get/useScenesByDomoticaControlId.tsx";
import {ValueCard} from "./ValueCard.tsx";
import {SmallScreenCardActions} from "./SmallScreenCardActions.tsx";
import {LargeScreenCardActions} from "./LargeScreenCardActions.tsx";
import {useMediaQueries} from "../../hooks/useMediaQueries.tsx";

interface DeviceCardProps {
    domoticaControl: DomoticaControl
}


export function DeviceCard({domoticaControl}: DeviceCardProps) {
    const {scenes} = useScenesByDomoticaControlId(domoticaControl.id);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const {updateDomoticaControl} = useUpdateDomoticaControl();
    const {deleteDomoticaControl} = useDeleteDomoticaControl();
    const {isSmallScreen } = useMediaQueries();
    const navigate = useNavigate();

    return (
        <>
            <Card sx={{mt: 2, p: 2, position: "relative", width: 350, maxWidth: 350}}>
                {!isSmallScreen &&
                    <RequiresUserBoundary requiredRole={"admin"}>
                        <LargeScreenCardActions
                            setIsEditing={setIsEditing}
                            setIsDeleting={setIsDeleting}
                        />
                    </RequiresUserBoundary>
                }
                {isSmallScreen &&
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography
                            onClick={() => navigate("/devices")}
                            sx={{
                                color: 'text.primary',
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                                cursor:"pointer"
                            }}
                        >
                            Devices
                        </Typography>
                        <Typography
                            onClick={() => navigate("/devices/"+domoticaControl.id)}
                            sx={{color: 'text.primary'}}
                        >
                            {domoticaControl.name}
                        </Typography>
                    </Breadcrumbs>
                }
                <Typography variant={"h4"}>
                    {domoticaControl.name}
                </Typography>

                <Typography>
                    {domoticaControl.description}
                </Typography>
                <Stack direction={"row"}
                       gap={2}
                       sx={{mt: 1}}>
                    <ValueCard label={"X"}
                               value={domoticaControl.x}/>
                    <ValueCard label={"Y"}
                               value={domoticaControl.y}/>
                </Stack>
                <Typography variant={"h4"}
                            sx={{mt: 2}}>
                    Controls
                </Typography>
                <DeviceControls domoticaControl={domoticaControl}/>
            </Card>

            <SmallScreenCardActions key={"device-actions"}
                                    editTooltip={"Huidig apparaat bijwerken"}
                                    deleteTooltip={"Huidig apparaat verwijderen"}
                                    setEditing={() => setIsEditing(true)}
                                    setDeleting={() => setIsDeleting(true)}/>

            <RequiresUserBoundary requiredRole={"admin"}>
                <ErrorBoundary fallback={<div>Error...</div>}>
                    <Suspense fallback={<DialogLoadingFallback/>}>
                        <UpdateDomoticaControlDialog currentDomoticaControl={domoticaControl}
                                                     isOpen={isEditing}
                                                     onClose={() => setIsEditing(false)}
                                                     onUpdateDomoticaControl={(data) => updateDomoticaControl(data)}
                        />
                    </Suspense>
                </ErrorBoundary>
            </RequiresUserBoundary>
            <ConfirmationDialog
                isOpen={isDeleting}
                onAccept={() => deleteDomoticaControl(domoticaControl.id)}
                onClose={() => setIsDeleting(false)}
                confirmationMessage={"Weet je zeker dat je dit apparaat wilt verwijderen?"}
                confirmationDescription={"(Deze actie kan niet ongedaan worden gemaakt!)"}
                warningMessage={
                    scenes.length != 0 ?
                        "Deze control wordt gebruikt in " + scenes.length + " scenes en zal uit deze scenes worden verwijderd." : ""
                }
            />
        </>
    )
}