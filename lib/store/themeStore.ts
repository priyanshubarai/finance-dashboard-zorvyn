import { create } from 'zustand'

export type themeStoreType = {
    isDark : boolean;
    toggleTheme : () => void;
}

export const useThemeStore = create<themeStoreType>((set)=> ({
    isDark : true,
    toggleTheme : () => set((prev) => ({isDark:!prev.isDark})),
}));
