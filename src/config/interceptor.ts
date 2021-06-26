import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Data } from './data';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  loading: any;

  constructor(public loadingCtrl: LoadingController) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = Data.getToken();

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${token}`,
        },
      });
    }

    request = request.clone({
      setHeaders: {
        'content-type': 'application/json',
      },
    });

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    this.showLoader();

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        this.hideLoader();
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.hideLoader();
        return throwError(error);
      })
    );
  }

  async showLoader() {
    this.loading = await this.loadingCtrl.create({
        duration: 1000,
        translucent: true,
        backdropDismiss: true
    });

    await this.loading.present();
  }

  hideLoader() {
    if (this.loading) this.loadingCtrl.dismiss();

    this.loading = null;
  }
}
