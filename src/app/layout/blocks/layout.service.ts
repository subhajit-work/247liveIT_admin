import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class LayoutService {
  constructor(private http: HttpClient, private router: Router) {}
  Logout() {
    const promise = new Promise((resolve, reject) => {
      const apiURL = environment.baseUrl + '/logout';
      this.http.put(apiURL, {})
          .toPromise()
          .then(
              res => { // Success
                  resolve(res);
              }
          ).catch(
          err => {
              console.log(err);
              if (err.error) {
                  if (err.error.code === 401) {
                    this.router.navigate(['/login']);
                  }
              }
              reject(err);
          }
      );
  });
  return promise;
  }
}
