import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UsersService } from './users.service';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewUser.component.html',
  styleUrls: []
})
export class ViewUserComponent implements OnInit {

  user: any;
  userId: any = 0;
  subscriptionPlans: any = [];
  selectedTab = 1;

  constructor(
    private userService: UsersService,
    private toastr: ToastrService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.userId = params.userId;
    });
  }

  ngOnInit(): void {
    this.GetUser();
    this.GetUserSubscriptionPlans(1);
  }

  // Get user details
  GetUser() {
    this.ngxLoader.start();
    this.userService.GetUser(this.userId).then((result) => {
      this.ngxLoader.stop();
      if (result['code'] == 200 && result['data']) {
        this.user = result['data'];
      } else {
        throw result;
      }
    }).catch((err) => {
      this.ngxLoader.stop();
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
    });
  }

  // Get user subscription plans
  GetUserSubscriptionPlans(planType) {
    this.selectedTab = planType
    this.ngxLoader.start();
    let reqData = {
      userId: this.userId,
      planType: planType
    }
    this.subscriptionPlans = [];
    this.userService.GetUserSubscriptionPlans(reqData).then((result) => {
      this.ngxLoader.stop();
      if (result['code'] == 200 && result['data']) {
        this.subscriptionPlans = result['data'];
      } else {
        throw result;
      }
    }).catch((err) => {
      this.ngxLoader.stop();
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
    });
  }
}
