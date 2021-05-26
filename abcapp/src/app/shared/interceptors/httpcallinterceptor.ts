import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

//Using HttpInterceptor to manipulate the request and response in angular
//
export class HttpCallInterceptor implements HttpInterceptor
{
    intercept(request:HttpRequest<any>,next:HttpHandler) :Observable<HttpEvent<any>>
    {
       return next.handle(request)
       .pipe(
           catchError((err:HttpErrorResponse)=>{
               var errmsg ='';
               if(err.error instanceof ErrorEvent)
               {
                   errmsg = err.error?.message;
               }
               else{
                   errmsg = err.status + err.message;
               }
               return throwError('An error occured');
           })
       ) 
    }
}