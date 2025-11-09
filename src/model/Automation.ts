export type Automation = {
    id:string;
    start:Date;
    end:Date;
    sceneId: string;
    enabled:boolean;
    isInterrupted:boolean;
}


export type AutomationWithoutId = Omit<Automation, 'id'>