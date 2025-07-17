
import {getTaskUrl} from "@/utils/urlHelpers"
import {AddTask,EditTask} from "@/types"

export async function addTask(task:AddTask){
  const res = await fetch(getTaskUrl(""),
 {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(task)
 }
)
  switch (res.status) {
    case 200:
      return res.json();
    case 401:
      throw new Error('Unauthorized access');
    case 404:
      throw new Error('Resource not found');
    case 500:
      throw new Error('Server error');
    default:
      throw new Error(`Unhandled status code: ${res.status}`);
  }
}

export async function editTask(task:EditTask){
  const res = await fetch(getTaskUrl(""),
 {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(task)
 }
)
  switch (res.status) {
    case 200:
      return res.json();
    case 401:
      throw new Error('Unauthorized access');
    case 404:
      throw new Error('Resource not found');
    case 500:
      throw new Error('Server error');
    default:
      throw new Error(`Unhandled status code: ${res.status}`);
  }
}

export async function deleteTask(ids:number[]){
  const res = await fetch(getTaskUrl("/delete"),
 {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(
        {
            ids:ids
        }
    )
 }
)
  switch (res.status) {
    case 200:
      return res.json();
    case 401:
      throw new Error('Unauthorized access');
    case 404:
      throw new Error('Resource not found');
    case 500:
      throw new Error('Server error');
    default:
      throw new Error(`Unhandled status code: ${res.status}`);
  }
}


export async function fetchTasks(){
  const res = await fetch(getTaskUrl(""),
 {
    method:"GET",
 }
)
  switch (res.status) {
    case 200:
      return res.json();
    case 401:
      throw new Error('Unauthorized access');
    case 404:
      throw new Error('Resource not found');
    case 500:
      throw new Error('Server error');
    default:
      throw new Error(`Unhandled status code: ${res.status}`);
  }
}