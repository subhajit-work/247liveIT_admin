import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginService } from '../login/login.service';
import { UsersService } from './users.service';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any;
  pageIndex: number = 1;
  perPage: number = 10;
  searchKey: string;
  usersCount: number = 0;
  ForgotPasswordForm: FormGroup;
  isForgotPasswordSubmit: boolean = false;

  constructor(private userService: UsersService, private loginService: LoginService, private toastr: ToastrService, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.GetUsers();
    this.ForgotPasswordForm = new FormGroup({
      password: new FormControl('')
    });
  }

  // Get all users
  GetUsers () {
    let reqObj = {
      pageIndex: (this.pageIndex - 1),
      perPage: this.perPage,
      searchKey: this.searchKey
    }
    this.users = [];
    this.ngxLoader.start();
    this.userService.GetUsers(reqObj).then((result) => {
      this.ngxLoader.stop();
      this.users = result['data']
      this.usersCount = result['totalCount']
    }).catch((err) => {
      this.ngxLoader.stop();
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
    });
  }

  // Search users
  SearchUsers () {
    this.pageIndex = 1;
    this.perPage = 10;
    this.GetUsers();
  }

  pageChange(e) {
    this.pageIndex = e;
    this.perPage = this.perPage;
    this.searchKey = this.searchKey;
    this.GetUsers();
  }

  // Active/Inactive user
  ChangeUserStatus(userId, status) {
    let msg = status === 1 ? 'Are you sure to activate this User' : 'Are you sure to deactivate this User'
    if(confirm(msg)) {
      let reqObj = {
        userId: userId,
        status: status
      }
      this.ngxLoader.start();
      this.userService.ChangeUserStatus(reqObj).then((result) => {
        this.ngxLoader.stop();
        this.GetUsers()
      }).catch((err) => {
        this.ngxLoader.stop();
        console.log(err);
        this.toastr.error(err.error.message, 'Failed');
      });
    }
  }

  changePasswordUser;
  changeUserPassword(_userId){
    this.changePasswordUser = _userId;
  }

  ForgotPassword(value) {
    this.isForgotPasswordSubmit = true
    // stop here if form is invalid
    if (this.ForgotPasswordForm.invalid) {
      return;
    }
    let reqData = {
      password: value.password,
      userId: this.changePasswordUser
    }
    this.loginService.GetUserPasswordResetLink(reqData).then((result) => {
      this.toastr.success('Password change successfully', 'Success');
      $("#forgotPwdModal").modal("hide");
    }).catch((err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Failed')
    });
  }

  closeForgotPasswordModal() {
    this.ForgotPasswordForm.reset();
  }
}
