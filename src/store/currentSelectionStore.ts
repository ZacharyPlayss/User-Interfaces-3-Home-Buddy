"use no memo";
import {create} from "zustand/react";
import type {Automation} from "../model/Automation.ts";

interface SelectionState{
    selectedDomoticaControlId: string | null;
    selectedRoomId: string | null;
    selectedFloorId: string|null;
    activeAutomation: Automation | null;
}

interface SelectionActions{
    updateSelectedDomoticaControlId: (id: string | null) => void;
    updateSelectedRoomId: (id: string | null ) => void;
    updateSelectedFloorId: (id: string | null ) => void;
    updateActiveAutomation: (automation: Automation | null) => void;
}

export const useCurrentSelectionStore = create<SelectionState & SelectionActions>((set,get) => ({
    selectedDomoticaControlId: null,
    selectedRoomId: null,
    selectedFloorId:null,
    activeAutomation: null,
    updateSelectedDomoticaControlId: (id) => {
        const current = get().selectedDomoticaControlId;
        set({ selectedDomoticaControlId: current === id ? null : id });
    },
    updateSelectedRoomId: (id) => {
        const current = get().selectedRoomId;
        set({ selectedRoomId: current === id ? null : id });
    },
    updateSelectedFloorId: (id) => {
      const current = get().selectedFloorId;
      set({ selectedFloorId: current === id ? null : id});
    },
    updateActiveAutomation: (automation) => {
        const current = get().activeAutomation;
        set({ activeAutomation: current === automation ? null : automation });
    },
}));