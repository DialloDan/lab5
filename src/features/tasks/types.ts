export type Task = {
	id: number;
	agent_id: number;
	assignment: string;
	status: string;
	date: string;
	deadline: string;
};

export type TaskDTO = {
  id: number;
  first_name: string;
  second_name: string;
  patronymic: string;
  assignment: string;
  status: string;
};