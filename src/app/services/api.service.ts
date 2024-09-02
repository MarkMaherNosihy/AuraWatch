import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private httpClient = inject(HttpClient);
  private baseUrl: string ='https://api.themoviedb.org/3';

  get(url:string, queryParams: string){
    return this.httpClient.get(`${this.baseUrl}/${url}?${queryParams}`);
  }
}
