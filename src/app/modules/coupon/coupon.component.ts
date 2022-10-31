import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CouponService } from './coupon.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  coupons: any;
  pageIndex: number = 1;
  perPage: number = 10;
  searchKey: string;
  couponsCount: number = 0;

  constructor(private couponService: CouponService, private toastr: ToastrService, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.GetCoupons()
  }

  // Get all Coupons
  GetCoupons () {
    let reqObj = {
      pageIndex: (this.pageIndex - 1),
      perPage: this.perPage,
      searchKey: this.searchKey
    }
    this.coupons = [];
    this.ngxLoader.start();
    this.couponService.GetCoupons(reqObj).then((result) => {
      this.ngxLoader.stop();
      this.coupons = result['data']
      this.couponsCount = result['totalCount']
    }).catch((err) => {
      this.ngxLoader.stop();
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
    });
  }

  // Search Coupons
  SearchCoupons () {
    this.pageIndex = 1;
    this.perPage = 10;
    this.GetCoupons();
  }

  pageChange(e) {
    this.pageIndex = e;
    this.perPage = this.perPage;
    this.searchKey = this.searchKey;
    this.GetCoupons();
  }

  // Active/Inactive Coupon
  ChangeCouponStatus(couponId, status) {
    let msg = status === 1 ? 'Are you sure to activate this Coupon' : 'Are you sure to deactivate this Coupon'
    if(confirm(msg)) {
      let reqObj = {
        couponId: couponId,
        status: status
      }
      this.ngxLoader.start();
      this.couponService.ChangeCouponStatus(reqObj).then((result) => {
        this.ngxLoader.stop();
        this.GetCoupons()
      }).catch((err) => {
        this.ngxLoader.stop();
        console.log(err);
        this.toastr.error(err.error.message, 'Failed');
      });
    }
  }
}
