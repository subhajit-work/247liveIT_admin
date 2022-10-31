import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CouponService } from './coupon.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { couponTypes } from './../../helpers/common';
declare var $: any;

@Component({
  selector: 'app-addcoupon',
  templateUrl: './addCoupon.component.html',
  styleUrls: [],
})
export class AddCouponComponent implements OnInit {
  CouponForm: FormGroup;
  isCouponSubmit: boolean = false;
  coupon: any;
  couponTypes = couponTypes;

  constructor(
    private couponService: CouponService,
    private toastr: ToastrService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
  ) {}

  ngOnInit(): void {
    let _self = this;
    this.CouponForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.maxLength(50),Validators.minLength(1)]),
      type: new FormControl(1, [Validators.required]),
      value: new FormControl(0.00, [Validators.required, Validators.min(1)]),
      expiredDate: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });

    $('#datetimepicker2').datetimepicker({
      format: 'YYYY-MM-DD',
      ignoreReadonly: true
    }).on('dp.change', function(e){
      _self.CouponForm.controls['expiredDate'].setValue(e.target.value)
    });
  }

  // Add new Discount Coupon
  AddCoupon(value: any) {
    this.isCouponSubmit = true
    // stop here if form is invalid
    let selectedType = this.CouponForm.get('type').value;
    if (selectedType == 1) {
      this.CouponForm.get('value').setValidators([Validators.required, Validators.min(1)])
      this.CouponForm.get('value').updateValueAndValidity();
    } else if (selectedType == 2) {
      this.CouponForm.get('value').setValidators([Validators.required, Validators.min(1), Validators.max(100)])
      this.CouponForm.get('value').updateValueAndValidity();
    }
    if (this.CouponForm.invalid) {
      return;
    }
    let reqData = {
      name: value.name,
      type: parseInt(value.type),
      value: value.value,
      expiredDate: value.expiredDate,
      description: value.description
    }
    console.log(reqData)
    this.ngxLoader.start();
    this.couponService.AddCoupon(reqData).then((result) => {
      this.ngxLoader.stop();
      if (result['code'] == 200) {
        this.router.navigate(['/coupons']);
      } else {
        throw(result)
      }
    }).catch((err) => {
      this.ngxLoader.stop();
      console.log(err);
      this.toastr.error(err.error.message, 'Failed')
    });
  }
}