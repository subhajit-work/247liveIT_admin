import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StaticPageService } from './static-page.service';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styleUrls: ['./static-page.component.css']
})
export class StaticPageComponent implements OnInit {
  staticPages: any;

  constructor(private staticPageService: StaticPageService, private toastr: ToastrService, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.GetStaticPages()
  }

  // Get all static pages
  GetStaticPages () {
    this.staticPages = [];
    this.ngxLoader.start();
    this.staticPageService.GetStaticPages().then((result) => {
      this.ngxLoader.stop();
      this.staticPages = result['data']
    }).catch((err) => {
      this.ngxLoader.stop();
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
    });
  }
}
