import type {Floor} from "../../../model/Floor.ts";
import {Card, CardContent, Stack, Typography} from "@mui/material";
import {FloorPlanNavigation} from "./FloorPlanNavigation.tsx";
import {AddEntityControls} from "./AddEntityControls.tsx";
import {NewRoomDialog} from "../../dialogs/room/NewRoomDialog.tsx";
import {Suspense, useState} from "react";
import {NewFloorDialog} from "../../dialogs/floor/NewFloorDialog.tsx";
import {NewDomoticaControlDialog} from "../../dialogs/domoticacontrol/NewDomoticaControlDialog.tsx";
import {RequiresUserBoundary} from "../../Boundary";
import {ErrorBoundary} from "react-error-boundary";
import {DialogLoadingFallback} from "../../fallbacks/loading/DialogLoadingFallback.tsx";
import {DialogErrorFallback} from "../../fallbacks/error/DialogErrorFallback.tsx";
import {useTour} from "@reactour/tour";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {useLocalStorage} from "usehooks-ts";

interface FloorPlanControlsProps {
    currentFloor: Floor,
    currentFloorIndex: number,
    floorsLength: number,
    onClickSelectNextFloor: () => void,
    onClickSelectPreviousFloor: () => void,
}

export function FloorPlanControls({
                                      currentFloor,
                                      currentFloorIndex,
                                      floorsLength,
                                      onClickSelectNextFloor,
                                      onClickSelectPreviousFloor
                                  }: FloorPlanControlsProps) {
    const [isCollapsed, setIsCollapsed] = useLocalStorage<boolean>("FloorPlanControlsCollapsed",false);
    const [newFloorDialogOpen, setNewFloorDialogOpen] = useState(false);
    const [newRoomDialogOpen, setNewRoomDialogOpen] = useState(false);
    const [newDomoticaControlDialogOpen, setNewDomoticaControlDialogOpen] = useState(false);
    const {setCurrentStep, currentStep, isOpen: tourOpen} = useTour();

    return (
        <>
            <Card sx={{
                position: "absolute",
                zIndex: 20000000,
                top: "5rem",
                left: "1rem",
                maxWidth: 250,
                height: isCollapsed ? "auto" : 0,
                p:1,
                cursor:"pointer"
            }}
                  onClick={() => setIsCollapsed(false)}
            >
                <KeyboardArrowDownIcon/>
            </Card>

            <Card
                id={"onboarding-second-step"}
                sx={{
                    position: "absolute",
                    //This extremely high value is due to @three/drei's HTML element dynamic positioning.
                    zIndex: 20000000,
                    top: "5rem",
                    left: "1rem",
                    maxWidth: 250,
                    height: isCollapsed ? 0 : "auto"
                }}
            >
                <CardContent>
                    <Stack direction={"row"} sx={{
                        cursor:"pointer",
                        pb:1
                    }}
                    onClick={() => setIsCollapsed(true)}
                    >
                        <KeyboardArrowUpIcon/>
                        <Typography>Controls verbergen</Typography>
                    </Stack>
                    {floorsLength != 0 &&
                        <>
                            <Stack direction={"row"}>
                                <Typography variant="h4">
                                    Verdieping:{currentFloor.level}
                                </Typography>
                            </Stack>
                            <FloorPlanNavigation
                                onNextFloor={onClickSelectNextFloor}
                                onPreviousFloor={onClickSelectPreviousFloor}
                                currentFloorIndex={currentFloorIndex}
                                floorsLength={floorsLength}
                            />
                        </>
                    }
                    <RequiresUserBoundary requiredRole={"admin"}>
                        <AddEntityControls
                            floorCount={floorsLength}
                            onAddFloor={() => {
                                setNewFloorDialogOpen(true);
                                if (tourOpen) {
                                    setCurrentStep(currentStep + 1);
                                }
                            }}
                            onAddRoom={() => {
                                setNewRoomDialogOpen(true)
                                if (tourOpen) {
                                    setCurrentStep(currentStep + 1);
                                }
                            }}
                            onAddDevice={() => {
                                setNewDomoticaControlDialogOpen(true)
                            }}
                        />
                    </RequiresUserBoundary>
                </CardContent>
            </Card>
            <RequiresUserBoundary requiredRole={"admin"}>
                <ErrorBoundary
                    fallbackRender={({error, resetErrorBoundary}) => (
                        <DialogErrorFallback error={error}
                                             resetErrorBoundary={resetErrorBoundary}/>
                    )}
                >
                    <Suspense fallback={<DialogLoadingFallback/>}>
                        <NewFloorDialog
                            isOpen={newFloorDialogOpen}
                            onClose={() => setNewFloorDialogOpen(false)}
                        />
                        {floorsLength != 0 &&
                            <NewRoomDialog currentFloor={currentFloor}
                                           isOpen={newRoomDialogOpen}
                                           onClose={() => setNewRoomDialogOpen(false)}
                            />
                        }
                        <NewDomoticaControlDialog isOpen={newDomoticaControlDialogOpen}
                                                  onClose={() => setNewDomoticaControlDialogOpen(false)}
                        />
                    </Suspense>
                </ErrorBoundary>
            </RequiresUserBoundary>
        </>
    )
}