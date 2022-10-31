import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router: Router) { }

  addUserAccountDtls(data, _identifier) {
    console.log('data',data);
    console.log('data',_identifier);
    
    const promise = new Promise((resolve, reject) => {
      let apiURL 
      if(_identifier == true){
        apiURL = environment.baseUrl + '/EditUserAccountDetails'
      }else{
        apiURL = environment.baseUrl + '/AddUserAccountDetails'
      }
      
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

  addEditSocialReport(data, _identifier) {
    console.log('data',data);
    console.log('data _identifier',_identifier);
    
    const promise = new Promise((resolve, reject) => {
      let apiURL 
      // if(_identifier == true){
      //   apiURL = environment.baseUrl + '/EditSocialReport'
      // }else{
        apiURL = environment.baseUrl + '/AddSocialReport'
      // }
      
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

  GetUsers(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/users?pageIndex='+data.pageIndex+'&perPage='+data.perPage;
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

  GetUserdata(userId) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/GetUserAccountDetails/'+userId;
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

  GetSocialReport(userId) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/GetSocialReportDetails/'+userId;
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

  ChangeUserStatus(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/setUserStatus'
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

  GetUser(userId) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/user/'+userId;
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

  GetUserSubscriptionPlans(data) {
    const promise = new Promise((resolve, reject) => {
      let apiURL = environment.baseUrl + '/subscription/userPlans?userId='+data.userId+'&planType='+data.planType;
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
}
