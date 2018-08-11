import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {config} from "../../config";
import {tap} from "rxjs/internal/operators";
import {ErrorService} from "./error.service";

/** Pass untouched request through to the next request handler. */
@Injectable()
export class BaseHttpInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {


    const newReq = req.clone({
      url: config.apiUrl + req.url
    });
    //return next.handle(newReq)

    return next.handle(newReq)
      .pipe(
        tap(() => {
          },
          (err: HttpErrorResponse) => {
            if (err.status === 401) {
              this.errorService.setMessage('Nie masz uprawnień');
            } else {
              const error = err.error;
              if (typeof error === 'string') {
                this.errorService.setMessage('błąd zapytania...');
              } else {
                const message = error[0].constraints[Object.keys(error[0].constraints)[0]];
                this.errorService.setMessage(message)
              }

            }


          }
        )
      )


  }
}
