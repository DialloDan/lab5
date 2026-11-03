import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLogin } from '@/features/auth/use-login';

const loginSchema = z.object({
	email: z.string().min(1, 'Password is too short'),
	password: z.string().min(1, 'Password is too short'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Route = createFileRoute("/login")({
	component: Login,
});

function Login() {
	const loginMutation = useLogin();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = (data: LoginFormData) => {
		loginMutation.mutate(data);
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Login</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label htmlFor="email" className="block font-medium">
						Email
					</label>
					<input
						id="email"
						{...register("email")}
						className="w-full p-2 border rounded"
					/>
					{errors.email && (
						<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
					)}
				</div>
				<div>
					<label htmlFor="password" className="block font-medium">
						Password
					</label>
					<input
						id="password"
						{...register("password")}
						className="w-full p-2 border rounded"
					/>
					{errors.password && (
						<p className="text-red-500 text-sm mt-1">
							{errors.password.message}
						</p>
					)}
				</div>

				<button
					type="submit"
					disabled={loginMutation.isPending}
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
				>
					{loginMutation.isPending ? "Saving..." : "Save Changes"}
				</button>
			</form>
		</div>
	);
}