import {Box, Button, Card, Stack} from "@mui/material";
import {useCurrentSelectionStore} from "../../../store/currentSelectionStore.ts";
import {Suspense, useState} from "react";
import {Carousel} from "../../Caroussel.tsx";
import {NewSceneDialog} from "../../dialogs/scene/NewSceneDialog.tsx";
import {MostUsedScenesCard} from "../MostUsedScenesCard.tsx";
import {UpcommingAutomationsCard} from "../UpcommingAutomationsCard.tsx";
import {DomoticaControlInformationCard} from "../DomoticaControlInformationCard.tsx";
import {AnimatePresence} from "motion/react";
import {ErrorBoundary} from "react-error-boundary";
import {DomoticaControlInformationCardLoadingFallback} from "../../fallbacks/loading/DomoticaControlInformationCardLoadingFallback.tsx";
import {useAllAutomation} from "../../../hooks/data/get/all/useAllAutomation.tsx";
import {useAllScenes} from "../../../hooks/data/get/all/useAllScenes.tsx";
import {DomoticaControlInformationCardErrorFallback} from "../../fallbacks/error/DomoticaControlInformationCardErrorFallback.tsx";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useMediaQueries} from "../../../hooks/useMediaQueries.tsx";
import {useLocalStorage} from "usehooks-ts";

export function DashboardBottomCards() {
    const {scenes} = useAllScenes();
    const {automations} = useAllAutomation();
    const {isSmallScreen } = useMediaQueries();
    const selectedDomoticaControlId = useCurrentSelectionStore(state => state.selectedDomoticaControlId);
    const updateSelectedDomoticaControlId = useCurrentSelectionStore(state => state.updateSelectedDomoticaControlId);
    const [isAddingScene, setIsAddingScene] = useState(false);
    const [isFullSize, setIsFullSize] = useLocalStorage<boolean>("DashboardBottomCardsOpen",true);

    return (
        <>
            {isSmallScreen &&
                <Box sx={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    zIndex: 1,
                    p: 3,
                    width: isSmallScreen ? "100%" : "auto",
                }}>
                    <Card
                        sx={{
                            mb: 1,
                            p: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            pointerEvents: "initial"
                        }}
                    >
                        <Button onClick={() => {
                            setIsFullSize(!isFullSize)
                        }}>
                            {isFullSize ?
                                <KeyboardArrowDownIcon/>
                                :
                                <KeyboardArrowUpIcon/>
                            }
                        </Button>
                    </Card>

                    {isSmallScreen && isFullSize && !selectedDomoticaControlId &&
                        <Carousel>
                            {scenes.length != 0 &&
                                <MostUsedScenesCard
                                                    sx={{minWidth: 250, width: "100%"}}
                                                    scenes={scenes}
                                />
                            }
                            {automations.length != 0 &&
                                <UpcommingAutomationsCard
                                    sx={{
                                        minWidth: 250,
                                        width: "100%",
                                    }}
                                    automations={automations}
                                />
                            }
                        </Carousel>
                    }
                    {selectedDomoticaControlId &&
                        <ErrorBoundary
                            fallbackRender={({error, resetErrorBoundary}) => (
                                <DomoticaControlInformationCardErrorFallback error={error}
                                                                             resetErrorBoundary={resetErrorBoundary}/>
                            )}
                        >
                            <Suspense fallback={<DomoticaControlInformationCardLoadingFallback/>}>
                                <AnimatePresence>
                                    <DomoticaControlInformationCard
                                        domoticaControlId={selectedDomoticaControlId}
                                        setDomoticaControlId={updateSelectedDomoticaControlId}
                                        sx={{
                                            minWidth: 250,
                                            width: isSmallScreen ? "90vw" : "100%",
                                            height: isSmallScreen ? "85vh" : 400,
                                            position: isSmallScreen ? "fixed" : "relative",
                                            top: isSmallScreen ? "10svh" : "auto",
                                            left: isSmallScreen ? "5svw" : "auto",
                                            zIndex: isSmallScreen ? 1300 : "auto",
                                            bgcolor: isSmallScreen ? "background.paper" : "inherit",
                                            pointerEvents: "initial",
                                        }}
                                    />

                                </AnimatePresence>
                            </Suspense>
                        </ErrorBoundary>
                    }
                </Box>
            }
                {!isSmallScreen && (
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 3,
                            display: "flex",
                            alignItems: "flex-end",
                            flexDirection: "row",
                            gap: 2,
                            height: "94vh",
                            pointerEvents: "none",
                        }}
                    >
                        <Stack direction={"column"}
                               sx={{
                                   width: "100%"
                        }}>
                            <Card
                                sx={{
                                    mb: 1,
                                    p: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    pointerEvents: "initial"
                                }}
                            >
                                <Button onClick={() => {
                                    setIsFullSize(!isFullSize)
                                }}>
                                    {isFullSize ?
                                        <KeyboardArrowDownIcon/>
                                        :
                                        <KeyboardArrowUpIcon/>
                                    }
                                </Button>
                            </Card>

                            {isFullSize &&
                                <Stack direction="row"
                                       spacing={2}
                                       sx={{
                                           flexGrow: 1,
                                           maxHeight: "45%",
                                           position: "relative"
                                       }}>
                                    {scenes.length != 0 &&
                                        <MostUsedScenesCard
                                                            sx={{flex: 1}}
                                                            scenes={scenes}
                                        />
                                    }
                                    {automations.length != 0 &&
                                        <UpcommingAutomationsCard
                                            sx={{
                                                flex: 1
                                            }}
                                            automations={automations}
                                        />
                                    }
                                </Stack>
                            }
                        </Stack>
                        <Box sx={{
                            height: "100%",
                            overflow: "hidden",
                            flexShrink:0
                        }}>
                            <ErrorBoundary
                                fallbackRender={({error, resetErrorBoundary}) => (
                                    <DomoticaControlInformationCardErrorFallback error={error}
                                                                                 resetErrorBoundary={resetErrorBoundary}/>
                                )}
                            >
                                <Suspense fallback={<DomoticaControlInformationCardLoadingFallback/>}>
                                    <AnimatePresence>
                                        {selectedDomoticaControlId && (
                                            <DomoticaControlInformationCard
                                                domoticaControlId={selectedDomoticaControlId}
                                                setDomoticaControlId={updateSelectedDomoticaControlId}
                                                sx={{height: "100%", width: 350, pointerEvents: "initial"}}
                                            />
                                        )}
                                    </AnimatePresence>
                                </Suspense>
                            </ErrorBoundary>
                        </Box>
                    </Box>
                )}
                <NewSceneDialog isOpen={isAddingScene}
                                onClose={() => setIsAddingScene(false)}/>
        </>
    )
}