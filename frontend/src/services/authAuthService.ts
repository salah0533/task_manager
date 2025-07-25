import {RegisterType,LogInType} from "@/types/index"
import {getAuthUrl} from "@/utils/urlHelpers"


export async function register(data:RegisterType){  

  const res = await fetch(getAuthUrl("/register"),
 {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data),
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

export async function login(data:LogInType){
  const res = await fetch(getAuthUrl("/login"),
 {
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data),
    credentials: "include",

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


