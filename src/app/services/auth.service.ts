import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Endpoints } from '../endpoints/endpoints';
import { User } from '../models/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = inject(ApiService);
  user!: User | null;
  router = inject(Router);
  constructor() { }


  login(body:any){
    return this.api.post(Endpoints.LOGIN, '', body);
  }

  register(body:any){
    return this.api.post(Endpoints.REGISTER, '', body)
  }


  logout() {
    this.user = null;
    localStorage.removeItem('user');
    this.router.navigateByUrl('/');
  }

  getUser() {
    if (!this.user) {
      const userFromStorage = localStorage.getItem('user');
      this.user = userFromStorage ? JSON.parse(userFromStorage) : null;
    }
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }
}
