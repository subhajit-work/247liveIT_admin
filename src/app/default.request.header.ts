// Set headers at every request call;
import { Injectable } from '@angular/core';
//import * as crypto from 'crypto';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sha256 } from 'js-sha256';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  nonce = Math.random().toString(36).substr(2, 6);
  timestamp = Date.now();
  secretKey = "5d816bd678ef051101dfa8a6084419cf"
  hash_str = "nonce=" + this.nonce + "&timestamp=" + this.timestamp + "|" + this.secretKey;

  ApiTokenTmp = sha256.hmac.create('ujC&XGHkFn5keIaC');

  //ApiTokenTmp = crypto.createHmac('sha256', 'ujC&XGHkFn5keIaC').update(this.hash_str).digest('hex');
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.ApiTokenTmp.update(this.hash_str);
    this.ApiTokenTmp.hex();
    request = request.clone({
      setHeaders: {
        Authorization: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        token: this.ApiTokenTmp.toString(),
        nonce: this.nonce,
        timestamp: this.timestamp.toString()
      }
    });
    return next.handle(request);
  }
}