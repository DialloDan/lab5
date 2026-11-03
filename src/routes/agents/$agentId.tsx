import { createFileRoute, useParams } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAgent, useUpdateAgent } from '@/features/agents/api';
import { useEffect } from 'react';

const agentSchema = z.object({
  first_name: z.string().min(1, 'First Name is too short'),
  second_name: z.string().min(1, 'Second Name is too short'),
  patronymic: z.string().min(1, 'Patronymic is too short'),
  passport: z.string().min(1, 'Passport is too short'),
  telephone: z.string().min(1, 'Telephone is too short'),
  email: z.string().min(1, 'Telephone is too short'),
  bank_card: z.string().min(1, 'Telephone is too short'),
  salary: z.string().min(1, 'Telephone is too short'),
});

type AgentFormData = z.infer<typeof agentSchema>;

export const Route = createFileRoute("/agents/$agentId")({
	component: AgentId,
});

function AgentId() {
  const { agentId } = useParams({ from: '/agents/$agentId' });
  const { data: agent, isLoading, isError } = useAgent(agentId);
  const updateAgentMutation = useUpdateAgent();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
  });

  useEffect(() => {
    if (agent) {
      reset({ 
        first_name: agent.first_name, 
        second_name: agent.second_name, 
        patronymic: agent.patronymic, 
        passport: agent.passport, 
        telephone: agent.telephone, 
        email: agent.email, 
        bank_card: agent.bank_card, 
        salary: agent.salary, 
      });
    }
  }, [agent, reset]);

  const onSubmit = (data: AgentFormData) => {
    updateAgentMutation.mutate({ id: agentId, data });
  };

  if (isLoading) return <div>Loading agent details...</div>;
  if (isError || !agent) return <div>Agent not found or failed to load.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Agent: {agent.first_name} {agent.second_name} {agent.patronymic}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="first_name" className="block font-medium">First Name</label>
          <input id="first_name" {...register('first_name')} className="w-full p-2 border rounded" />
          {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name.message}</p>}
        </div>
        <div>
          <label htmlFor="second_name" className="block font-medium">Second Name</label>
          <input id="second_name" {...register('second_name')} className="w-full p-2 border rounded" />
          {errors.second_name && <p className="text-red-500 text-sm mt-1">{errors.second_name.message}</p>}
        </div>
        <div>
          <label htmlFor="patronymic" className="block font-medium">Patronymic</label>
          <input id="patronymic" {...register('patronymic')} className="w-full p-2 border rounded" />
          {errors.patronymic && <p className="text-red-500 text-sm mt-1">{errors.patronymic.message}</p>}
        </div>
        <div>
          <label htmlFor="passport" className="block font-medium">Passport</label>
          <input id="passport" {...register('passport')} className="w-full p-2 border rounded" />
          {errors.passport && <p className="text-red-500 text-sm mt-1">{errors.passport.message}</p>}
        </div>
        <div>
          <label htmlFor="telephone" className="block font-medium">Telephone</label>
          <input id="telephone" {...register('telephone')} className="w-full p-2 border rounded" />
          {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block font-medium">Email</label>
          <input id="email" {...register('email')} className="w-full p-2 border rounded" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="bank_card" className="block font-medium">Bank Card</label>
          <input id="bank_card" {...register('bank_card')} className="w-full p-2 border rounded" />
          {errors.bank_card && <p className="text-red-500 text-sm mt-1">{errors.bank_card.message}</p>}
        </div>
        <div>
          <label htmlFor="salary" className="block font-medium">Salary</label>
          <input id="salary" {...register('salary')} className="w-full p-2 border rounded" />
          {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary.message}</p>}
        </div>

        <button type="submit" disabled={updateAgentMutation.isPending} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400">
          {updateAgentMutation.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}