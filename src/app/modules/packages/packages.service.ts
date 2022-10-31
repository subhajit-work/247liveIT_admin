import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {

  constructor(private http: HttpClient, private router: Router) { }

  AddPackage(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/package'
      this.http.post(apiURL, data).toPromise().then(
        res => {
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
    })
    return promise;
  }

  GetPackages(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/packages?pageIndex='+data.pageIndex+'&perPage='+data.perPage;
      if (data.searchKey && data.searchKey.trim().length > 0) {
        apiURL = apiURL.concat('&searchKey='+encodeURIComponent(data.searchKey));
      };
      this.http.get(apiURL).toPromise().then(
        res => {
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
    })
    return promise;
  }

  ChangePackageStatus(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/setPackageStatus'
      this.http.put(apiURL, data).toPromise().then(
        res => {
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
    })
    return promise;
  }

  GetPackage(userId) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/package/'+userId;
      this.http.get(apiURL).toPromise().then(
        res => {
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
    })
    return promise;
  }

  GetCategories() {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/categories'
      this.http.get(apiURL).toPromise().then(
        res => {
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
    })
    return promise;
  }

  EditPackage(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/package'
      this.http.put(apiURL, data).toPromise().then(
        res => {
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
    })
    return promise;
  }
}
