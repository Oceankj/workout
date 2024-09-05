import create from 'zustand';

interface DialogStore {
    dialogs: { [key: string]: boolean }; // Dialog IDs mapped to open/close states
    openDialog: (id: string) => void;
    closeDialog: (id: string) => void;
    closeAllDialogs: () => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
    dialogs: {},
    openDialog: (id: string) =>
        set((state) => ({
            dialogs: { ...state.dialogs, [id]: true },
        })),
    closeDialog: (id: string) =>
        set((state) => ({
            dialogs: { ...state.dialogs, [id]: false },
        })),
    closeAllDialogs: () =>
        set(() => ({
            dialogs: {},
        })),
}));
