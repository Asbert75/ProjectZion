import { create } from 'zustand';

export const useGlobal = create((set) => ({
    showConfirmLogoutModal: false,
    setShowConfirmLogoutModal: (value: boolean) => set((state: any) => state.setShowConfirmLogoutModal = value)
}));