import {Box} from "@mui/material";
import {FloorPlan, FloorPlanControls} from "../components/Floorplan";
import {DashboardBottomCards} from "../components/cards/dashboardBottomCards/DashboardBottomCards.tsx";
import {RequiresUserBoundary} from "../components/Boundary";
import {WelcomeCard} from "../components/cards/WelcomeCard.tsx";
import {ErrorBoundary} from "react-error-boundary";
import {Suspense, useState} from "react";
import {FloorPlanLoadingFallback} from "../components/fallbacks/loading/FloorPlanLoadingFallback.tsx";
import {DashboardBottomCardsLoadingFallback} from "../components/fallbacks/loading/DashboardBottomCardsLoadingFallback.tsx";
import {FloorPlanErrorFallback} from "../components/fallbacks/error/FloorPlanErrorFallback.tsx";
import {useAllFloorsWithRooms} from "../hooks/data/get/all/useAllFloorsWithRooms.tsx";
import {useFloorPlanSettings} from "../hooks/useFloorPlanSettings.tsx";
import {useCurrentSelectionStore} from "../store/currentSelectionStore.ts";

export function Dashboard() {
    const {floors} = useAllFloorsWithRooms();
    const updateSelectedFloorId = useCurrentSelectionStore(state => state.updateSelectedFloorId);
    const [selectedFloorIndex, setSelectedFloorIndex] = useState(0);
    const {currentSetting} = useFloorPlanSettings();

    function selectFloorByIndex(index: number) {
        if (index >= 0 && index < floors.length) {
            setSelectedFloorIndex(index);
            updateSelectedFloorId(floors[index].id);
        }
    }

    return (
        <>
            <Box id={"onboarding-first-step"} sx={{position: "relative", width: "100vw", height: "100vh"}}>
                <RequiresUserBoundary fallback={<WelcomeCard/>}>
                    <Box sx={{position: "absolute", inset: 0, zIndex: 0}}>
                        <ErrorBoundary
                            fallbackRender={({error, resetErrorBoundary}) => (
                                <FloorPlanErrorFallback error={error}
                                                        resetErrorBoundary={resetErrorBoundary}/>
                            )}
                        >
                            <Suspense fallback={<FloorPlanLoadingFallback/>}>
                                <FloorPlanControls
                                    currentFloor={floors[selectedFloorIndex]}
                                    currentFloorIndex={selectedFloorIndex}
                                    floorsLength={floors.length}
                                    onClickSelectNextFloor={() => selectFloorByIndex(selectedFloorIndex + 1)}
                                    onClickSelectPreviousFloor={() => selectFloorByIndex(selectedFloorIndex - 1)}
                                />

                                <FloorPlan
                                    floorPlanMode={currentSetting}
                                    selectedFloorIndex={selectedFloorIndex}
                                    setSelectedFloorIndex={setSelectedFloorIndex}
                                />
                            </Suspense>
                        </ErrorBoundary>
                    </Box>

                    <ErrorBoundary
                        fallbackRender={({error, resetErrorBoundary}) => (
                            <FloorPlanErrorFallback error={error}
                                                    resetErrorBoundary={resetErrorBoundary}/>
                        )}
                    >
                        <Suspense fallback={<DashboardBottomCardsLoadingFallback/>}>
                            <DashboardBottomCards/>
                        </Suspense>
                    </ErrorBoundary>

                </RequiresUserBoundary>
            </Box>
        </>
    );
}
