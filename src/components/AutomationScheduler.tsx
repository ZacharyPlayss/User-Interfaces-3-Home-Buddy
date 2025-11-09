import {useAutomationScheduler} from "../hooks/realtime/useAutomationScheduler.tsx";
import {ErrorSnackbar} from "./Snackbar";
import {useDataSync} from "../hooks/realtime/useDataSync.tsx";


export function AutomationScheduler() {
    const {isError} = useAutomationScheduler(false);
    useDataSync({enableLogging:false});

    if (isError) {
        return (
            <ErrorSnackbar msg={"Failed to poll data... Retrying in 30 seconds"}/>
        );
    }
    return (
        <>
        </>
    )
}