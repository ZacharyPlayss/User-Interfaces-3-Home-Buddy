import {useQuery} from "@tanstack/react-query";
import type {Automation} from "../../model/Automation.ts";
import {getAllAutomations} from "../../services/automationService.ts";
import {useEffect} from "react";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {useCurrentSelectionStore} from "../../store/currentSelectionStore.ts";
import {useAllScenes} from "../data/get/all/useAllScenes.tsx";
import {useEnableAutomation} from "../data/update/useEnableAutomation.tsx";
import {useDisableActiveAutomation} from "../useDisableActiveAutomation.tsx";
import {automationQueryKeys} from "../../config/api/queryKeys";
import {useResetAutomations} from "../data/update/useResetAutomations.tsx";
import {refetchInterval} from "../../config/realtime/config.ts";

dayjs.extend(utc);

export function useAutomationScheduler(enableLogging: boolean = false) {
    const {data: automations, isError, isSuccess} = useQuery<Automation[]>({
        queryKey: automationQueryKeys.all,
        queryFn: () => getAllAutomations(),
        refetchInterval: refetchInterval
    });
    const {scenes} = useAllScenes({enabled: !!automations});
    const {enableAutomation} = useEnableAutomation();
    const {resetActiveAutomations} = useResetAutomations();
    const {disableActiveAutomation} = useDisableActiveAutomation();
    const activeAutomation = useCurrentSelectionStore((s) => s.activeAutomation);
    const updateActiveAutomation = useCurrentSelectionStore((s) => s.updateActiveAutomation);

    function handleAutomationEnable(automation: Automation) {
        const {enabled, isInterrupted, sceneId, id} = automation;
        const shouldEnable = !enabled && activeAutomation !== automation && !isInterrupted;
        if (shouldEnable) {
            const scene = scenes.find((s) => s.id === sceneId);
            if (scene) {
                console.log(`Enabling automation ${id} which enables scene ${scene.id}`);
                enableAutomation(automation.id);
            }
        }
    }

    function handleAutomationInterruptedByUser(automation: Automation) {
        const {isInterrupted} = automation;
        const shouldInterrupt = !activeAutomation?.isInterrupted && isInterrupted;
        if (shouldInterrupt) {
            if (enableLogging) {
                console.log('The found current automation should be interrupted!');
                console.log('Disabling automation');
            }
            disableActiveAutomation();
        }
    }


    function findCurrent() {
        if (!automations) return undefined;
        const now = dayjs.utc();
        const referenceDay = now.startOf('day');
        const nowTime = referenceDay.hour(now.hour()).minute(now.minute());

        for (const automation of automations) {
            const start = referenceDay
                .hour(dayjs.utc(automation.start).hour())
                .minute(dayjs.utc(automation.start).minute());
            const end = referenceDay
                .hour(dayjs.utc(automation.end).hour())
                .minute(dayjs.utc(automation.end).minute());
            if (nowTime.isAfter(start) && nowTime.isBefore(end)) return automation;
            if (nowTime.isSame(start) || nowTime.isSame(end)) return automation;
        }
        return undefined;
    }

    //UseEffect hook here is required to syncronise incomming polling data.
    useEffect(() => {
        if (!isSuccess) return;
        if (enableLogging) {
            console.log("Automationscheduler has refetched data.");
        }
        const currentAutomation = findCurrent();

        //An automation should be active but is not active yet.
        if (currentAutomation && !currentAutomation.enabled && !currentAutomation.isInterrupted) {
            if (enableLogging) {
                console.log("we should enable the automation.");
            }
            handleAutomationEnable(currentAutomation);
            return;
        }
        //An automation is active and should be but was interrupted by user.
        if (currentAutomation && currentAutomation.enabled && currentAutomation.isInterrupted) {
            if (enableLogging) {
                console.log('We should interrupt the automation.');
            }
            handleAutomationInterruptedByUser(currentAutomation);
            return;
        }
        //There should NOT be an active automation but there is still an automation active or interrupted
        if (!currentAutomation && automations.some((automation) => automation.enabled === true || automation.isInterrupted === true)) {
            if (enableLogging) {
                console.log("Cleanup after automation.");
            }
            const activeAutomation = automations.find((automation) => automation.enabled === true || automation.isInterrupted === true);
            if (activeAutomation) {
                resetActiveAutomations();
                updateActiveAutomation(null);
            }
            return;
        }

        return;
    }, [isSuccess]);

    return {automations, isError};
}