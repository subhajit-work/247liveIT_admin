import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {

  constructor(private http: HttpClient, private router: Router) { }

  AddTestimonial(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/testimonial'
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

  GetTestimonials(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/testimonials?pageIndex='+data.pageIndex+'&perPage='+data.perPage;
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

  ChangeTestimonialStatus(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/setTestimonialStatus'
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

  GetTestimonial(testimonialId) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/testimonial/'+testimonialId;
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

  EditTestimonial(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/testimonial'
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
