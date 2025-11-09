import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./config/theme/theme.ts";
import {Dashboard} from "./pages/Dashboard.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BuildingManagement} from "./pages/BuildingManagement.tsx";
import {DeviceManagement} from "./pages/DeviceManagement.tsx";
import {SceneManagement} from "./pages/SceneManagement.tsx";
import {UserContextProvider} from "./context/contextProviders/UserContextProvider.tsx";
import {SettingsPage} from "./pages/SettingsPage.tsx";
import {NavBar} from "./components/NavBar.tsx";
import {AutomationScheduler} from './components/AutomationScheduler.tsx';
import {RequiresUserBoundary} from "./components/Boundary";
import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {ManagementPageLoadingFallback} from "./components/fallbacks/loading/ManagementPageLoadingFallback.tsx";
import {PageErrorFallback} from "./components/fallbacks/error/PageErrorFallback.tsx";
import {TourProvider} from "@reactour/tour";
import {steps} from "./config/onboarding/steps.ts"
import {CustomTourNavigation} from "./onboarding/CustomTourNavigation.tsx";
import "./config/api/config.ts";

const queryClient = new QueryClient()

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <BrowserRouter>
                        <TourProvider
                            steps={steps}
                            showCloseButton={false}
                            showBadge={false}
                            components={{ Navigation: (props) => <CustomTourNavigation {...props} /> }}
                        >
                            <UserContextProvider>
                                <RequiresUserBoundary>
                                    <NavBar/>
                                </RequiresUserBoundary>
                                <Routes>
                                    <Route path={"/"}
                                           element={<Dashboard/>}/>
                                    <Route
                                        path="/building/:floorId?/:roomId?"
                                        element={
                                            <ErrorBoundary
                                                fallbackRender={({error, resetErrorBoundary}) => (
                                                    <PageErrorFallback error={error}
                                                                       resetErrorBoundary={resetErrorBoundary}/>
                                                )}
                                            >
                                                <Suspense fallback={<ManagementPageLoadingFallback/>}>
                                                    <BuildingManagement/>
                                                </Suspense>
                                            </ErrorBoundary>
                                        }
                                    />
                                    <Route path={"/devices/:deviceId?"}
                                           element={
                                               <ErrorBoundary
                                                   fallbackRender={({error, resetErrorBoundary}) => (
                                                       <PageErrorFallback error={error}
                                                                          resetErrorBoundary={resetErrorBoundary}/>
                                                   )}
                                               >
                                                   <Suspense fallback={<ManagementPageLoadingFallback/>}>
                                                       <DeviceManagement/>
                                                   </Suspense>
                                               </ErrorBoundary>
                                           }/>
                                    <Route path={"/scenes/:sceneId?"}
                                           element={
                                               <ErrorBoundary
                                                   fallbackRender={({error, resetErrorBoundary}) => (
                                                       <PageErrorFallback error={error}
                                                                          resetErrorBoundary={resetErrorBoundary}/>
                                                   )}
                                               >
                                                   <Suspense fallback={<ManagementPageLoadingFallback/>}>
                                                       <SceneManagement/>
                                                   </Suspense>
                                               </ErrorBoundary>
                                           }/>
                                    <Route path={"/settings"}
                                           element={<SettingsPage/>}/>
                                </Routes>
                            </UserContextProvider>
                        </TourProvider>
                    </BrowserRouter>
                </ThemeProvider>
                <AutomationScheduler/>
            </QueryClientProvider>
        </>
    )
}

export default App
