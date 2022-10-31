import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  ForgotPasswordForm: FormGroup;
  isLoginSubmit: boolean = false;
  isForgotPasswordSubmit: boolean = false;
  pwdLockFlag: boolean = false;

  constructor(private router: Router, private loginService: LoginService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    });

    this.ForgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  // Show and Hide password
  ShowHidePassword() {
    this.pwdLockFlag = !this.pwdLockFlag;
  }

  Login(value) {
    this.isLoginSubmit = true

    // stop here if form is invalid
    if (this.LoginForm.invalid) {
      return;
    }
    let reqData = {
      email: value.email,
      password: value.password
    }
    this.loginService.login(reqData).then((result) => {
      localStorage.setItem('email', result['data']['email']);
      localStorage.setItem('token', result['data']['token']);
      this.router.navigate(['/home']);
    }).catch((err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Failed')
    });
  }

  ForgotPassword(value) {
    this.isForgotPasswordSubmit = true
    // stop here if form is invalid
    if (this.ForgotPasswordForm.invalid) {
      return;
    }
    let reqData = {
      email: value.email
    }
    this.loginService.GetPasswordResetLink(reqData).then((result) => {
      this.toastr.success('Verification email has been sent to your email address', 'Success');
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
