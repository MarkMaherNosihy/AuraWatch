import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { delay } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let cloneReq =  req.clone({
    headers: req.headers.set('Authorization', `Bearer ${environment.token}`)
  });
  return next(cloneReq).pipe();
};
