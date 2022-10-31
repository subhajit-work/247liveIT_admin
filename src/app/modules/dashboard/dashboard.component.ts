import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Earning' }
  ];
  range: number = 1;
  pageIndex: number = 1;
  perPage: number = 5;
  subscriptionCount: number = 0;
  subscriptions: any;

  constructor(private dashboardService: DashboardService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.GetChartEarnings();
    this.GetEarnings();
  }

  GetChartEarnings(e?: any) {
    let range = 1
    if (typeof e !== 'undefined') {
      range = e.target.value
    }
    this.range = range;
    this.dashboardService.GetChartEarnings(range).then((result) => {
      this.barChartData[0]['data'] = result['data']['data']
      this.barChartLabels = result['data']['labels'];
      this.GetEarnings();
    }).catch((err) => {
      console.log(err);
      // this.toastr.error(err.error.message, 'Failed')
    });
  }

  GetEarnings () {
    let reqObj = {
      pageIndex: (this.pageIndex - 1),
      perPage: this.perPage,
      range: this.range
    }
    this.subscriptions = [];
    this.dashboardService.GetEarnings(reqObj).then((result) => {
      this.subscriptions = result['data']
      this.subscriptionCount = result['totalCount']
    }).catch((err) => {
      console.log(err);
      // this.toastr.error(err.error.message, 'Failed');
    });
  }

  ExportSubscription(type) {
    let reqObj = {
      range: this.range,
      type: type
    }
    this.dashboardService.ExportSubscription(reqObj).then((result) => {
      this.toastr.success('Exported file has been sent to your email id', 'Success');
    }).catch((err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
    });
  }

}
