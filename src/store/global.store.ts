import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

type SheetContent = 'cart' | 'search' | null;


export interface GlobalState {
    isSheetOpen: boolean;
    sheetContent: SheetContent;

    //  TODO: navbar mobile
    openSheet: (content: SheetContent) => void;
    closeSheet: () => void;

}

const storeApi: StateCreator<GlobalState> = set => ({
    isSheetOpen: false,
    sheetContent: null,

    openSheet: (content) => {
        set({ isSheetOpen: true, sheetContent: content })
    },
    closeSheet: () => {
        set({ isSheetOpen: false })
    },
});

export const useGlobalStore = create<GlobalState>()(devtools(storeApi));