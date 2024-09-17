import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../endpoints/endpoints';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private httpClient = inject(HttpClient);
  get<T>(url:string, queryParams: string){
    return this.httpClient.get<T>(`${environment.publicBase}/${url}?${queryParams}`);
  }
  getAuth<T>(url:string, queryParams: string){
    return this.httpClient.get<T>(`${environment.base}/${url}?${queryParams}`);
  } 
   post<T>(url:string, queryParams: string, body: any){
    return this.httpClient.post<T>(`${url}?${queryParams}`, body);
  }
  postAuth<T>(url:string, queryParams: string, body: any){
    return this.httpClient.post<T>(`${environment.base}/${url}?${queryParams}`, body);
  }

  delete(url:string, queryParams: string){
    return this.httpClient.delete(`${environment.base}/${url}?${queryParams}`);
  }

  patchAuth<T>(url:string, queryParams: string){
    return this.httpClient.patch<T>(`${environment.base}/${url}?${queryParams}`, null);
  }
}
