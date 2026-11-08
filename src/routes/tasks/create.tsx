import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateTask } from '@/features/tasks/api';

const taskSchema = z.object({
	agent_id: z.number().positive("Task must be a positive number"),
	assignment: z.string().min(1, "Assignment is too short"),
	status: z.string().min(1, "Status is too short"),
	date: z.iso.date(),
	deadline: z.iso.date(),
});

type TaskFormData = z.infer<typeof taskSchema>;

export const Route = createFileRoute('/tasks/create')({
  component: Create,
});

function Create() {
  const createTaskMutation = useCreateTask();
  const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TaskFormData) => {
    createTaskMutation.mutate(data);
  };

  return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Create Task</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div>
					<label htmlFor="agent_id" className="block font-medium">
						Agent ID
					</label>
					<input
						id="agent_id"
						type="number"
						{...register("agent_id", {
							valueAsNumber: true,
							required: "ID агенту обов'язкове",
							validate: (value) => !isNaN(value) || "Введіть коректне число",
						})}
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
						{...register("assignment", {
							required: "Задача обов'язкова",
						})}
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
						{...register("status", {
							required: "Статус обов'язковий",
						})}
						className="w-full p-2 border rounded"
					/>
					{errors.status && (
						<p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
					)}
				</div>
				<div>
					<label htmlFor="date" className="block font-medium">
						Date
					</label>
					<input
						id="date"
						type="date"
						{...register("date", {
							required: "Дата обов'язкова",
						})}
						className="w-full p-2 border rounded"
					/>
					{errors.date && (
						<p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
					)}
				</div>
				<div>
					<label htmlFor="deadline" className="block font-medium">
						Deadline
					</label>
					<input
						id="deadline"
						type="date"
						{...register("deadline", {
							required: "Дедлайн обов'язковий",
						})}
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
					disabled={createTaskMutation.isPending}
					className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
				>
					{createTaskMutation.isPending ? "Saving..." : "Save Changes"}
				</button>
			</form>
		</div>
	);
}