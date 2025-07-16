export type Task = {
  id: number;
  title: string;
  creationDate: string | null;
  completionDate: string | null;
  priority: string;
  status: string;
};

export type AddTask = {
  title: string;
  creationDate: string | null;
  completionDate: string | null;
  priority: string;
  status: string;
};

export type EditTask = {
  id: number;
  title: string;
  completionDate: string | null;
  priority: string;
  status: string;
};