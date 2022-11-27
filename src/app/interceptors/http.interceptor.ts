import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(

  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url) {
      return next.handle(request);
    }

    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isApiUrl) {
      request = request.clone({
        withCredentials: true
      });
    }
    return next.handle(request);
  }
}
