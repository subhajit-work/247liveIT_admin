import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}
  login(data) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = environment.baseUrl + '/login';
      this.http
        .put(apiURL, data)
        .toPromise()
        .then((res) => {
          // Success
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
    return promise;
  }

  GetPasswordResetLink(data) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = environment.baseUrl + '/forgot_password';
      this.http
        .put(apiURL, data)
        .toPromise()
        .then((res) => {
          // Success
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
    return promise;
  }

  GetUserPasswordResetLink(data) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = environment.baseUrl + '/ChangePassword';
      this.http
        .post(apiURL, data)
        .toPromise()
        .then((res) => {
          // Success
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
    return promise;
  }

  ResetPassword(data) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = environment.baseUrl + '/resetAdminPassword?token='+data.token;
      this.http.put(apiURL, data).toPromise().then(
        res => {
          resolve(res);
        }
      ).catch(
        err => {
          console.log(err);
          reject(err);
        }
      );
    })
    return promise;
  }
}
