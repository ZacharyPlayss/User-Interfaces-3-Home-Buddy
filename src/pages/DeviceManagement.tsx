import {useDomoticaControls} from "../hooks/data/get/useDomoticaControls.tsx";
import {Box, Button, Card, Stack, Typography} from "@mui/material";
import {DeviceList} from "../components/lists/DeviceList.tsx";
import {DeviceCard} from "../components/cards/DeviceCard.tsx";
import {Suspense, useState} from "react";
import {NewDomoticaControlDialog} from "../components/dialogs/domoticacontrol/NewDomoticaControlDialog.tsx";
import {ErrorBoundary} from "react-error-boundary";
import {DialogLoadingFallback} from "../components/fallbacks/loading/DialogLoadingFallback.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {DialogErrorFallback} from "../components/fallbacks/error/DialogErrorFallback.tsx";
import {useMediaQueries} from "../hooks/useMediaQueries.tsx";
import {RequiresUserBoundary} from "../components/Boundary";

export function DeviceManagement() {
    const {deviceId} = useParams();
    const navigate = useNavigate();
    const {isSmallScreen} = useMediaQueries();
    const {domoticaControls} = useDomoticaControls();
    const [isAddingDevice, setIsAddingDevice] = useState(false);

    function selectDomoticaControl(domoticaControlId: string) {
        const nextDeviceId = domoticaControlId === deviceId ? null : domoticaControlId;
        if (nextDeviceId != null) {
            navigate(`/devices/${nextDeviceId}`);
        } else {
            navigate(`/devices`);
        }
    }

    const selectedDomoticaControl = domoticaControls.find((control) => control.id === deviceId) || null;
    return (
        <Box sx={{p: 3, mt: 6, position: "relative", height: "90vh"}}>
            <Stack
                spacing={2}
                direction={isSmallScreen ? "column" : "row"}
                sx={{height: "100%"}}
            >
                {isSmallScreen ? (
                    <>
                        {selectedDomoticaControl ? (
                            <DeviceCard domoticaControl={selectedDomoticaControl}/>
                        ) : (
                            <Card sx={{mt: 8, p: 2, minWidth: 350}}>
                                <Stack direction={"row"}
                                       spacing={2}
                                       justifyContent={"space-between"}
                                       alignItems="center"
                                       sx={{mb: 1}}>
                                    <Typography variant={"h4"}>Devices</Typography>
                                    <RequiresUserBoundary requiredRole={"admin"}>
                                        <Button
                                            variant={"contained"}
                                            color={"primary"}
                                            onClick={() => setIsAddingDevice(true)}
                                        >
                                            Apparaat toevoegen
                                        </Button>
                                    </RequiresUserBoundary>
                                </Stack>
                                <DeviceList
                                    devices={domoticaControls}
                                    updateDomoticaControlId={selectDomoticaControl}
                                />
                            </Card>
                        )}
                    </>
                ) : (
                    <>
                        <Card sx={{mt: 8, p: 2, minWidth: 350}}>
                            {domoticaControls.length != 0 ? <>
                                    <Stack direction={"row"}
                                           spacing={2}
                                           justifyContent={"space-between"}
                                           alignItems="center"
                                           sx={{mb: 1}}>
                                        <Typography variant={"h4"}>Apparaten</Typography>
                                        <RequiresUserBoundary requiredRole={"admin"}>
                                            <Button
                                                variant={"contained"}
                                                color={"primary"}
                                                onClick={() => setIsAddingDevice(true)}
                                            >
                                                Apparaat toevoegen
                                            </Button>
                                        </RequiresUserBoundary>
                                    </Stack>
                                    <DeviceList
                                        devices={domoticaControls}
                                        updateDomoticaControlId={selectDomoticaControl}
                                    />
                                </>
                                :
                                <>
                                    <Stack direction={"column"}>
                                        <Typography variant={"h4"}>Geen apparaten...</Typography>
                                        <Typography>Maak een nieuw apparaat aan om er controle over te
                                            nemen.</Typography>
                                        <Button
                                            sx={{mt: 2}}
                                            variant={"contained"}
                                            color={"primary"}
                                            onClick={() => setIsAddingDevice(true)}
                                        >
                                            Apparaat aanmaken
                                        </Button>
                                    </Stack>
                                </>
                            }
                        </Card>

                        {selectedDomoticaControl && (
                            <DeviceCard domoticaControl={selectedDomoticaControl}/>
                        )}
                    </>
                )}
            </Stack>
            <ErrorBoundary
                fallbackRender={({error, resetErrorBoundary}) => (
                    <DialogErrorFallback error={error}
                                         resetErrorBoundary={resetErrorBoundary}/>
                )}
            >
                <Suspense fallback={<DialogLoadingFallback/>}>
                    <NewDomoticaControlDialog isOpen={isAddingDevice}
                                              onClose={() => setIsAddingDevice(false)}/>
                </Suspense>
            </ErrorBoundary>
        </Box>
    );
}
