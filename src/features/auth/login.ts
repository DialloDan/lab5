// features/auth/login.ts
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { apiFetch } from "@/api.ts";
import { useAuthStore } from "@/store/auth-store.ts";

const LoginResponse = z.object({ data: z.string() });

export function useLogin() {
	const setToken = useAuthStore((s) => s.setToken);
	return useMutation({
		mutationFn: async (creds: { email: string; password: string }) =>
			LoginResponse.parse(
				await apiFetch("/auth/login", {
					method: "POST",
					body: JSON.stringify(creds),
				})
			).data,
		onSuccess: (token) => setToken(token),
	});
}