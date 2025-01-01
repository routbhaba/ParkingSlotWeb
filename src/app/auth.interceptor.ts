import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import{catchError} from "rxjs/operators";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private toastr:ToastrService,private router:Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("accesstoken");
    // Clone the request to add the new Authorization header
    //console.log("ok intercept");
    const modifiedReq = (req.url!=="http://localhost:1009/parking/getaccesstoken") ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }) : req;
    return next.handle(modifiedReq).pipe(
      catchError(error => {
        if (error.status === 401) {
         // this.authService.clearToken(); // Clear token and redirect on 401
         this.toastr.error("Session expired");
         this.router.navigate(['login']);
        }
        return throwError(error);
      })
    );
  }
}
