import {useEffect, useState} from "react";

interface SyncedStateProps<T> {
    initialValue: T;
    syncValue?: T;
}

//The hook is designed to be used togheter with interactive input like for ex. sliders. It keeps the interaction smooth for the user but still synced with an incomming value.
//Ex. initvalue: "1" syncValue: "control.value.temperature" -> will keep the value in sync with the temp. value from an incomming control.
//Leave syncvalue empty when the initvalue is equal to the synced prop.
export function useSyncedState<T>({ initialValue, syncValue }: SyncedStateProps<T>) {
    const [state, setState] = useState<T>(initialValue);

    useEffect(() => {
        if (syncValue !== undefined) {
            setState(syncValue);
        } else {
            setState(initialValue);
        }
    }, [syncValue, initialValue]);

    return [state, setState] as const;
}