import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from './user/user.service';
import { CsrfService } from './user/csrf.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const userService = inject(UserService);
  const csrf = inject(CsrfService);

  const token = userService.getToken();

  let newReq = req;

  if(token) {
    newReq = req.clone({
      setHeaders: {
        Authorization:`Bearer ${token}`
      }
    });
  }

  const mutates = 
  (newReq.method !== 'GET') &&
  (newReq.method !== 'HEAD') && 
  (newReq.method !== 'OPTIONS');

  if(mutates) {
    const csrfToken = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]+)/)?.[1] ?? null;
    if(csrfToken){
      newReq = newReq.clone({
        withCredentials: true,
        setHeaders: {
          'X-XSRF-TOKEN': csrfToken
        }
      });
    }
  }

  return next(newReq)
};