import { Link, createFileRoute } from '@tanstack/react-router';
import { useAgents, useDeleteAgent } from '@/features/agents/api.ts';

export const Route = createFileRoute('/agents')({
  component: Agents,
});

function Agents() {
  const { data: agents, isLoading, isError, error } = useAgents();
  const deleteAgentMutation = useDeleteAgent();
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      deleteAgentMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading agents: {error.message}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Agents</h1>
        <Link to="/agents/create" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create New Agent
        </Link>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Second Name</th>
            <th className="py-2 px-4 border-b">Patronymic</th>
            <th className="py-2 px-4 border-b">Passport</th>
            <th className="py-2 px-4 border-b">Telephone</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Bank Card</th>
            <th className="py-2 px-4 border-b">Salary</th>
          </tr>
        </thead>

        <tbody>
          {agents?.map((agent) => (
            <tr key={agent.id}>
              <td className="py-2 px-4 border-b">{agent.id}</td>
              <td className="py-2 px-4 border-b">{agent.first_name}</td>
              <td className="py-2 px-4 border-b">{agent.second_name}</td>
              <td className="py-2 px-4 border-b">{agent.patronymic}</td>
              <td className="py-2 px-4 border-b">{agent.passport}</td>
              <td className="py-2 px-4 border-b">{agent.telephone}</td>
              <td className="py-2 px-4 border-b">{agent.email}</td>
              <td className="py-2 px-4 border-b">{agent.bank_card}</td>
              <td className="py-2 px-4 border-b">${agent.salary}</td>
              <td className="py-2 px-4 border-b text-center">
                <Link to="/agents/$agentId" params={{ agentId: String(agent.id) }} className="text-indigo-600 hover:text-indigo-900 mr-4">
                  Edit
                </Link>
                <button onClick={() => handleDelete(String(agent.id))} disabled={deleteAgentMutation.isPending} className="text-red-600 hover:text-red-900 disabled:opacity-50">
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