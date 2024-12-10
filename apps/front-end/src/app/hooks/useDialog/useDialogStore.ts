import { create } from 'zustand';

interface DialogStore {
    dialogs: [string, React.ReactNode][];
    isKeyExist: (key: string) => boolean;
    isDialogOpen: (key: string) => boolean;
    openDialog: (key: string, element: React.ReactNode) => void;
    closeDialog: (key: string) => void;
    closeAllDialogs: () => void;
}

export const useDialogStore = create<DialogStore>((set, get) => ({
    dialogs: [],
    isKeyExist: (key) =>
        get().dialogs.some(([currentKey]) => currentKey === key),
    isDialogOpen: (key) =>
        !!get().dialogs.find(([currentKey]) => currentKey === key),
    openDialog: (key, element) =>
        set((state) => ({
            dialogs: [...state.dialogs, [key, element]],
        })),
    closeDialog: (key) =>
        set((state) => ({
            dialogs: state.dialogs.filter(([currentKey]) => currentKey !== key),
        })),
    closeAllDialogs: () =>
        set(() => ({
            dialogs: [],
        })),
}));
