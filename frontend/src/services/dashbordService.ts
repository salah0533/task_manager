import {getDashboardUrl} from "@/utils/urlHelpers"
import {logout} from "@/utils/cokiesHelper"

export async function fetch_stats(router: any){
    const res = await fetch(getDashboardUrl("/stats"),{
      method:"GET",
      credentials: "include"
    })
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
    
