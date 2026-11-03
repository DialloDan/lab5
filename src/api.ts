// api.ts — один помічник для всіх запитів до нашого бекенду
import { useAuthStore } from "./store/auth-store";

const API = import.meta.env.VITE_API_BASE_URL; // у реальному проєкті — import.meta.env.VITE_API_URL

export async function apiFetch(
	path: string,
	init: RequestInit = {}
): Promise<unknown> {
	const token = useAuthStore.getState().token;
	const res = await fetch(`${API}${path}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...(token ? { Authorization: token } : {}), // бекенд чекає "Bearer <jwt>"
			...init.headers,
		},
	});
	if (res.status === 401) {
		useAuthStore.getState().logout(); // токен прострочений або недійсний — розлогінюємо
	}
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json(); // unknown: далі обов'язково перевіряємо схемою zod
}
