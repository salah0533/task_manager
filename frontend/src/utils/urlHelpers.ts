import {API_BASE_URL} from "../constants/configs"

export const getApiUrl = (endpoint:string)=> `${API_BASE_URL}${endpoint}`
export const getTaskUrl = (endpoint:string)=> `${API_BASE_URL}/task${endpoint}`