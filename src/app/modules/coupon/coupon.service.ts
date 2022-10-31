import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient, private router: Router) { }

  AddCoupon(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/coupon'
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

  GetCoupons(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/coupons?pageIndex='+data.pageIndex+'&perPage='+data.perPage;
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

  ChangeCouponStatus(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/setCouponStatus'
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

  GetCoupon(couponId) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/coupon/'+couponId;
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

  EditCoupon(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/coupon'
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
