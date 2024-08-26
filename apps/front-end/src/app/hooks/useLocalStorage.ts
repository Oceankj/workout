import { create } from 'zustand';

interface LocalStorageStore {
    items: Record<string, unknown>;
    setItem: (key: string, value: unknown) => void;
    getItem: <ItemType = unknown>(key: string) => ItemType | null;
    removeItem: (key: string) => void;
    clear: () => void;
}

const useLocalStorageStore = create<LocalStorageStore>((set, get) => ({
    items: {},

    setItem: (key, value) => {
        set((state) => ({ items: { ...state.items, [key]: value } }));
        localStorage.setItem(key, JSON.stringify(value));
    },

    getItem: <ItemType = unknown>(key: string): ItemType | null => {
        const { items } = get();
        if (key in items) return items[key] as ItemType;
        const value = localStorage.getItem(key);
        if (value) {
            const parsedValue = JSON.parse(value);
            set((state) => ({ items: { ...state.items, [key]: parsedValue } }));
            return parsedValue;
        }
        return null;
    },

    removeItem: (key) => {
        set((state) => {
            const { [key]: _, ...rest } = state.items;
            return { items: rest };
        });
        localStorage.removeItem(key);
    },

    clear: () => {
        set({ items: {} });
        localStorage.clear();
    },
}));

export default useLocalStorageStore;
