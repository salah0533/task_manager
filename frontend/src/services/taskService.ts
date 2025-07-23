
import {getTaskUrl} from "@/utils/urlHelpers"
import {AddTask,EditTask} from "@/types"
import {logout} from "@/utils/cokiesHelper"

export async function addTask(task:AddTask,router: any){

  const res = await fetch(getTaskUrl(""),
 {
    method:"POST",
    credentials: "include",
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
      logout()
      router.replace('/authentication/login');
    case 404:
      throw new Error('Resource not found');
    case 500:
      throw new Error('Server error');
    default:
      throw new Error(`Unhandled status code: ${res.status}`);
  }
}

export async function editTask(task:EditTask,router: any){
  const res = await fetch(getTaskUrl("/update"),
 {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(task),
    credentials: "include",

 }
)
  switch (res.status) {
    case 200:
      return res.json();
    case 401:
      logout()
      router.replace('/authentication/login');
    case 404:
      throw new Error('Resource not found');
    case 500:
      throw new Error('Server error');
    default:
      throw new Error(`Unhandled status code: ${res.status}`);
  }
}

export async function deleteTask(ids:number[],router: any){
  const res = await fetch(getTaskUrl("/delete"),
 {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    credentials: "include",
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
      logout()
      router.replace('/authentication/login');
    case 404:
      throw new Error('Resource not found');
    case 500:
      throw new Error('Server error');
    default:
      throw new Error(`Unhandled status code: ${res.status}`);
  }
}


export async function fetchTasks(router: any){
  const res = await fetch(getTaskUrl(""),
 {
    method:"GET",
    credentials: "include",
 }

)
  switch (res.status) {
    case 200:
      return res.json();
    case 401:
      logout()
      router.replace('/authentication/login');
    case 404:
      throw new Error('Resource not found');
    case 500:
      throw new Error('Server error');
    default:
      throw new Error(`Unhandled status code: ${res.status}`);
  }
}