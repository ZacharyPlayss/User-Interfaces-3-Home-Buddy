import type {Scene} from "../../../model/Scene.ts";
import {useUpdateScene} from "./useUpdateScene.tsx";
import {useUpdateDomoticaControlValues} from "./useUpdateDomoticaControlValues.tsx";
import {useDisableActiveScenes} from "../../useDisableActiveScenes.tsx";
import {useMostUsedScenes} from "../../useMostUsedScenes.tsx";

export function useEnableScene() {
    const {disableActiveScenes} = useDisableActiveScenes();
    const {updateScene, isSuccess} = useUpdateScene();
    const {updateDomoticaControlValues} = useUpdateDomoticaControlValues();
    const {increaseCount} = useMostUsedScenes();

    function enableScene(scene: Scene){
        disableActiveScenes();
        const sceneToEnable: Scene = {...scene, enabled:true};

        scene.controls.forEach((control) => {
            updateDomoticaControlValues({
                id:control.id,
                value:control.value
            })
        })

        updateScene(sceneToEnable);
        increaseCount(sceneToEnable.id);
    }


    return {
        isSuccess,
        enableScene,
    }
}
