import {useLocalStorage} from 'usehooks-ts'

export function useMostUsedScenes() {
    const [sceneCounts, setSceneCounts] = useLocalStorage<Record<string, number>>(
        "mostUsedScenes",
        {}
    );

    function getCount(sceneId: string) {
        return sceneCounts[sceneId] ?? 0;
    }

    function increaseCount(sceneId: string) {
        setSceneCounts({
            ...sceneCounts,
            [sceneId]: (sceneCounts[sceneId] ?? 0) + 1,
        });
    }

    function getAllSceneIdsByUsageCount() {
        return Object.keys(sceneCounts).sort(
            (a, b) => (sceneCounts[b] ?? 0) - (sceneCounts[a] ?? 0)
        );
    }

    return { getCount,getAllSceneIdsByUsageCount, increaseCount };
}