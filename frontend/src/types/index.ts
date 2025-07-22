export type Task = {
  id: number;
  title: string;
  description:string;
  creationDate: string | null;
  completionDate: string | null;
  priority_id: number;
  status_id: number;
};
export type TaskStatus={
    id:number;
    status:string;
}
export type TaskPriority={
    id:number;
    priority:string;
}
export type AddTask = {
  title: string;
  description:string;
  priority_id: number;
  status_id: number;
};

export type EditTask = {
  id: number;
  title: string;
  description:string;
  priority_id: number;
  status_id: number;
};

export type RegisterType ={
  name:String;
  email:String;
  password:String;
}

export type LogInType = {
  email:String;
  password:String
}