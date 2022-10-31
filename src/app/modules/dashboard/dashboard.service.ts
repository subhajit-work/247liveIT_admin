import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private router: Router) { }

  ChangePassword(data) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = environment.baseUrl + '/changePassword';
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

  GetChartEarnings(range) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = environment.baseUrl + '/subscription/earningChartData/'+range;
      this.http
        .get(apiURL)
        .toPromise()
        .then((res) => {
          // Success
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          if (err.error) {
            if (err.error.code === 401) {
              this.router.navigate(['/login']);
            }
          }
          reject(err);
        });
    });
    return promise;
  }

  GetEarnings(data) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = environment.baseUrl + '/subscription/earnings/'+data.range+'?pageIndex='+data.pageIndex+'&perPage='+data.perPage
      this.http
        .get(apiURL)
        .toPromise()
        .then((res) => {
          // Success
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          if (err.error) {
            if (err.error.code === 401) {
              this.router.navigate(['/login']);
            }
          }
          reject(err);
        });
    });
    return promise;
  }

  ExportSubscription(data) {
    const promise = new Promise((resolve, reject) => {
      const apiURL = environment.baseUrl + '/subscription/exportEarnings';
      this.http
        .put(apiURL, data)
        .toPromise()
        .then((res) => {
          // Success
          resolve(res);
        })
        .catch((err) => {
          console.log(err);
          if (err.error) {
            if (err.error.code === 401) {
              this.router.navigate(['/login']);
            }
          }
          reject(err);
        });
    });
    return promise;
  }
}
