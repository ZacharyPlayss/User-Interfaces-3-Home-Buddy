//This file contains export regarding queryKeys used by React Query.
export const automationQueryKeys={
    all:["automations"] as const,
    byId: (id:string) => ["automations",id] as const,
    allBySceneId: ["automationsBySceneId"] as const,
}

export const sceneQueryKeys={
    all:["scenes"] as const,
    byId:(id:string) => ["scenes",id] as const,
    allActive:["activeScenes"] as const
}

export const domoticaControlQueryKeys={
    all:['domoticaControls'] as const,
    byId: (id:string) => ['domoticaControls',id] as const,
}

export const roomQueryKeys={
    all:['rooms'] as const,
}

export const floorQueryKeys={
    all:['floors'] as const,
    allWithRooms:['floorsWithRooms'] as const
}