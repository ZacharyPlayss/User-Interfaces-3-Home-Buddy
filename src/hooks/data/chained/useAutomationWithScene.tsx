import {useAutomation} from "../get/single/useAutomation.tsx";
import {useScene} from "../get/single/useScene.tsx";

export function useAutomationWithScene(automationId: string) {
    const {automation}= useAutomation(automationId);
    const sceneId = automation?.sceneId;
    const { scene } = useScene(sceneId!, {enabled: !!sceneId});

    return {
        automation,
        scene,
    }
}
