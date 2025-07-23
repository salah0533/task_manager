import { setLogIn,setLogOut } from "@/redux/slices/isLogedInSlice"

export const tokenExist = (isLogedIn:boolean):boolean=>{
    if(!isLogedIn){
        const data = Boolean(localStorage.getItem("isLogedIn"))
        if(data)
            return true
        else 
            return false
    }
    return true
}

export const logout = ()=>{
  localStorage.removeItem("isLogedIn")
}