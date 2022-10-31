import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PackagesService } from './packages.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  packages: any;
  pageIndex: number = 1;
  perPage: number = 10;
  searchKey: string;
  packagesCount: number = 0;

  constructor(private packagesService: PackagesService, private toastr: ToastrService, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.GetPackages()
  }

  // Get all packages
  GetPackages () {
    let reqObj = {
      pageIndex: (this.pageIndex - 1),
      perPage: this.perPage,
      searchKey: this.searchKey
    }
    this.packages = [];
    this.ngxLoader.start();
    this.packagesService.GetPackages(reqObj).then((result) => {
      this.ngxLoader.stop();
      this.packages = result['data']
      this.packagesCount = result['totalCount']
    }).catch((err) => {
      this.ngxLoader.stop();
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
    });
  }

  // Search packages
  SearchPackages () {
    this.pageIndex = 1;
    this.perPage = 10;
    this.GetPackages();
  }

  pageChange(e) {
    this.pageIndex = e;
    this.perPage = this.perPage;
    this.searchKey = this.searchKey;
    this.GetPackages();
  }

  // Active/Inactive package
  ChangePackageStatus(packageId, stripePlanId, status) {
    let msg = status === 1 ? 'Are you sure to activate this Package' : 'Are you sure to deactivate this Package'
    if(confirm(msg)) {
      let reqObj = {
        stripePlanId: stripePlanId,
        packageId: packageId,
        status: status
      }
      this.ngxLoader.start();
      this.packagesService.ChangePackageStatus(reqObj).then((result) => {
        this.ngxLoader.stop();
        this.GetPackages()
      }).catch((err) => {
        this.ngxLoader.stop();
        console.log(err);
        this.toastr.error(err.error.message, 'Failed');
      });
    }
  }
}
