import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService } from '../services/shared/storage/storage.service';


@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
    constructor(private router: Router, private storageService: StorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap({
                error: (err: HttpErrorResponse) => {
                    if (err.status === 401) {
                        this.storageService.clean();
                        this.router.navigate(['/login']);
                        window.location.reload();
                    }
                },
            })
        );
    }
}
