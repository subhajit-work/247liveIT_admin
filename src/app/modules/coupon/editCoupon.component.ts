import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CouponService } from './coupon.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConvertDateFormat } from './../../helpers/common';
declare var $: any;

@Component({
  selector: 'app-editcoupon',
  templateUrl: './editCoupon.component.html',
  styleUrls: [],
})
export class EditCouponComponent implements OnInit {
  CouponForm: FormGroup;
  isCouponSubmit: boolean = false;
  couponId: any = 0;
  coupon: any;

  constructor(
    private couponService: CouponService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService,
  ) {
    this.route.params.subscribe((params) => {
      this.couponId = params.couponId;
    });
  }

  ngOnInit(): void {
    let _self = this;

    this.CouponForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.maxLength(50),Validators.minLength(1)]),
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

    this.GetCoupon()
  }

  // Get Coupon
  GetCoupon() {
    this.couponService.GetCoupon(this.couponId).then((result) => {
      if (result['code'] == 200) {
        this.coupon = result['data'];
        this.CouponForm.get("name").patchValue(this.coupon['name']);
        this.CouponForm.get("value").patchValue(this.coupon['value']);
        this.CouponForm.get("expiredDate").patchValue(ConvertDateFormat(this.coupon.expiredDate, 'YYYY-MM-DD'));
        this.CouponForm.get("description").patchValue(this.coupon['description']);
      } else {
        throw(result)
      }
    }).catch((err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Failed')
    });
  }

  // Add new Coupon
  EditCoupon(value: any) {
    this.isCouponSubmit = true
    // stop here if form is invalid
    if (this.CouponForm.invalid) {
      return;
    }
    let reqData = {
      couponId: parseInt(this.couponId),
      name: value.name,
      value: value.value,
      expiredDate: value.expiredDate,
      description: value.description
    }
    console.log(reqData);
    this.ngxLoader.start();
    this.couponService.EditCoupon(reqData).then((result) => {
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