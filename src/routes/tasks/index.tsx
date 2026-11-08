import { Link, createFileRoute } from '@tanstack/react-router';
import { useTasks, useDeleteTask } from '@/features/tasks/api.ts';

export const Route = createFileRoute('/tasks/')({
  component: Tasks,
});

function Tasks() {
  const { data: tasks, isLoading, isError, error } = useTasks();
  const deleteTaskMutation = useDeleteTask();
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTaskMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading tasks: {error.message}</div>;

  return (
		<div className="p-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Tasks</h1>
				<Link
					to="/tasks/create"
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				>
					Create New Task
				</Link>
			</div>

			<table className="min-w-full bg-white">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b">ID</th>
						<th className="py-2 px-4 border-b">First Name</th>
						<th className="py-2 px-4 border-b">Second Name</th>
						<th className="py-2 px-4 border-b">Patronymic</th>
						<th className="py-2 px-4 border-b">Assignment</th>
						<th className="py-2 px-4 border-b">Status</th>
					</tr>
				</thead>

				<tbody>
					{tasks?.map((task) => (
						<tr key={task.id}>
							<td className="py-2 px-4 border-b">{task.id}</td>
							<td className="py-2 px-4 border-b">{task.first_name}</td>
							<td className="py-2 px-4 border-b">{task.second_name}</td>
							<td className="py-2 px-4 border-b">{task.patronymic}</td>
							<td className="py-2 px-4 border-b">{task.assignment}</td>
							<td className="py-2 px-4 border-b">{task.status}</td>
							<td className="py-2 px-4 border-b text-center">
								<Link
									to="/tasks/$taskId"
									params={{ taskId: String(task.id) }}
									className="text-indigo-600 hover:text-indigo-900 mr-4"
								>
									Edit
								</Link>
								<button
									onClick={() => handleDelete(String(task.id))}
									disabled={deleteTaskMutation.isPending}
									className="text-red-600 hover:text-red-900 disabled:opacity-50"
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}