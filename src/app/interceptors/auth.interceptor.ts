import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  let cloneReq;
  const auth = inject(AuthService);
  if(req.url.includes(`${environment.base}`)){

     cloneReq =  req.clone({
      headers: req.headers.set('Authorization', `${auth.getUser()?.token}`)
    });
  }else{
     cloneReq =  req.clone({
      headers: req.headers.set('Authorization', `Bearer ${environment.token}`)
    });
  }
  return next(cloneReq).pipe();
};
