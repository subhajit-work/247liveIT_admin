import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatchPassword } from './../../helpers/custom.validator'
import { DashboardService } from './dashboard.service';


@Component({
  selector: 'app-changePassword',
  templateUrl: './changePassword.component.html',
  styleUrls: [],
})
export class ChangePasswordComponent implements OnInit {
  currentPwdLockFlag: boolean = false;
  newPwdLockFlag: boolean = false;
  cnfPwdLockFlag: boolean = false;
  ChangePasswordForm: FormGroup;
  isChangePasswordSubmit: boolean = false;

  constructor(private dashboardService: DashboardService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.ChangePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(8)]),
      confPassword: new FormControl('', [Validators.required])
    }, {
      validators: MatchPassword
    });
  }

  // Show and Hide password
  ShowHideCurrentPassword() {
    this.currentPwdLockFlag = !this.currentPwdLockFlag;
  }
  ShowHideNewPassword() {
    this.newPwdLockFlag = !this.newPwdLockFlag;
  }
  ShowHideConfirmPassword() {
    this.cnfPwdLockFlag = !this.cnfPwdLockFlag;
  }

  ChangePassword(value) {
    this.isChangePasswordSubmit = true

    // stop here if form is invalid
    if (this.ChangePasswordForm.invalid) {
      return;
    }
    let reqData = {
      currentPassword: value.currentPassword,
      password: value.password,
      confPassword: value.confPassword
    }
    this.dashboardService.ChangePassword(reqData).then((result) => {
      console.log(result);
      this.toastr.success('Password changed successfully', 'Success')
      this.router.navigate(['/home']);
    }).catch((err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Failed')
    });
  }
}
