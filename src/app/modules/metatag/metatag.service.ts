import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class MetatagService {

  constructor(private http: HttpClient, private router: Router) { }

  AddMetatag(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/addMetaTag'
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

  GetMetatags(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/getMetaTags?pageIndex='+data.pageIndex+'&perPage='+data.perPage;
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

  ChangeMetatagStatus(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/setMetatagStatus'
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

  GetMetatag(metatagId) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/getMetaTag/'+metatagId;
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

  EditMetatag(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/editMetaTag'
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
}
