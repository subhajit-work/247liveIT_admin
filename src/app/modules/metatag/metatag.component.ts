import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MetatagService } from './metatag.service';

@Component({
  selector: 'app-metatag',
  templateUrl: './metatag.component.html',
  styleUrls: ['./metatag.component.css']
})

export class MetatagComponent implements OnInit {

  metatags: any;
  pageIndex: number = 1;
  perPage: number = 10;
  searchKey: string;
  metatagsCount: number = 0;

  constructor(private metatagService: MetatagService, private toastr: ToastrService, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.GetMetatags()
  }

  // Get all Metatags
  GetMetatags () {
    let reqObj = {
      pageIndex: (this.pageIndex - 1),
      perPage: this.perPage,
      searchKey: this.searchKey
    }
    this.metatags = [];
    this.ngxLoader.start();
    this.metatagService.GetMetatags(reqObj).then((result) => {
      this.ngxLoader.stop();
      this.metatags = result['data']
      this.metatagsCount = result['totalCount']
    }).catch((err) => {
      this.ngxLoader.stop();
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
    });
  }

  // Search Metatags
  SearchMetatags () {
    this.pageIndex = 1;
    this.perPage = 10;
    this.GetMetatags();
  }

  pageChange(e) {
    this.pageIndex = e;
    this.perPage = this.perPage;
    this.searchKey = this.searchKey;
    this.GetMetatags();
  }

  // Active/Inactive Metatag
  ChangeMetatagStatus(metatagId, status) {
    let msg = status === 1 ? 'Are you sure to activate this Metatag' : 'Are you sure to deactivate this Metatag'
    if(confirm(msg)) {
      let reqObj = {
        metatagId: metatagId,
        status: status
      }
      this.ngxLoader.start();
      this.metatagService.ChangeMetatagStatus(reqObj).then((result) => {
        this.ngxLoader.stop();
        this.GetMetatags()
      }).catch((err) => {
        this.ngxLoader.stop();
        console.log(err);
        this.toastr.error(err.error.message, 'Failed');
      });
    }
  }

}