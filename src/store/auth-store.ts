import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
	token: string | null; // "Bearer <jwt>" з відповіді бойлерплейта
	setToken: (token: string) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			token: null,
			setToken: (token) => set({ token }),
			logout: () => set({ token: null }),
		}),
		{ name: "auth" } // ключ у localStorage
	)
);
