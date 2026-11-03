import { createFileRoute, useParams } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTask, useUpdateTask } from '@/features/tasks/api';
import { useEffect } from 'react';

const taskSchema = z.object({
  agent_id: z.number().positive('Task must be a positive number'),
  assignment: z.string().min(1, 'Assignment is too short'),
  status: z.string().min(1, 'Status is too short'),
  date: z.string().date(),
  deadline: z.string().date(),
});

type TaskFormData = z.infer<typeof taskSchema>;

export const Route = createFileRoute("/tasks/$taskId")({
	component: $taskId,
});

function $taskId() {
	const { taskId } = useParams({ from: "/tasks/$taskId" });
	const { data: task, isLoading, isError } = useTask(taskId);
	const updateTaskMutation = useUpdateTask();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<TaskFormData>({
		resolver: zodResolver(taskSchema),
	});

	useEffect(() => {
		if (task) {
			reset({
				agent_id: 0,
				assignment: task.assignment,
				status: task.status,
				date: "",
				deadline: "",
			});
		}
	}, [task, reset]);

	const onSubmit = (data: TaskFormData) => {
		updateTaskMutation.mutate({ id: taskId, data });
	};

	if (isLoading) return <div>Loading task details...</div>;
	if (isError || !task) return <div>Task not found or failed to load.</div>;

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Edit Task</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label htmlFor="agent_id" className="block font-medium">
						Agent ID
					</label>
					<input
						id="agent_id"
						{...register("agent_id")}
						className="w-full p-2 border rounded"
					/>
					{errors.agent_id && (
						<p className="text-red-500 text-sm mt-1">
							{errors.agent_id.message}
						</p>
					)}
				</div>
				<div>
					<label htmlFor="assignment" className="block font-medium">
						Assignment
					</label>
					<input
						id="assignment"
						{...register("assignment")}
						className="w-full p-2 border rounded"
					/>
					{errors.assignment && (
						<p className="text-red-500 text-sm mt-1">
							{errors.assignment.message}
						</p>
					)}
				</div>
				<div>
					<label htmlFor="status" className="block font-medium">
						Status
					</label>
					<input
						id="status"
						{...register("status")}
						className="w-full p-2 border rounded"
					/>
					{errors.status && (
						<p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
					)}
				</div>
				<div>
					<label htmlFor="date" className="block font-medium">
						Passport
					</label>
					<input
						id="date"
						{...register("date")}
						className="w-full p-2 border rounded"
					/>
					{errors.date && (
						<p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
					)}
				</div>
				<div>
					<label htmlFor="deadline" className="block font-medium">
						Telephone
					</label>
					<input
						id="deadline"
						{...register("deadline")}
						className="w-full p-2 border rounded"
					/>
					{errors.deadline && (
						<p className="text-red-500 text-sm mt-1">
							{errors.deadline.message}
						</p>
					)}
				</div>

				<button
					type="submit"
					disabled={updateTaskMutation.isPending}
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
				>
					{updateTaskMutation.isPending ? "Saving..." : "Save Changes"}
				</button>
			</form>
		</div>
	);
}