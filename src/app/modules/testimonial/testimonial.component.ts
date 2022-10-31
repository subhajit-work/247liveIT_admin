import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TestimonialService } from './testimonial.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  testimonials: any;
  pageIndex: number = 1;
  perPage: number = 10;
  searchKey: string;
  testimonialsCount: number = 0;

  constructor(private testimonialService: TestimonialService, private toastr: ToastrService, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.GetTestimonials()
  }

  // Get all Testimonials
  GetTestimonials () {
    let reqObj = {
      pageIndex: (this.pageIndex - 1),
      perPage: this.perPage,
      searchKey: this.searchKey
    }
    this.testimonials = [];
    this.ngxLoader.start();
    this.testimonialService.GetTestimonials(reqObj).then((result) => {
      this.ngxLoader.stop();
      this.testimonials = result['data']
      this.testimonialsCount = result['totalCount']
    }).catch((err) => {
      this.ngxLoader.stop();
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
    });
  }

  // Search Testimonials
  SearchTestimonials () {
    this.pageIndex = 1;
    this.perPage = 10;
    this.GetTestimonials();
  }

  pageChange(e) {
    this.pageIndex = e;
    this.perPage = this.perPage;
    this.searchKey = this.searchKey;
    this.GetTestimonials();
  }

  // Active/Inactive Testimonial
  ChangeTestimonialStatus(testimonialId, status) {
    let msg = status === 1 ? 'Are you sure to activate this Testimonial' : 'Are you sure to deactivate this Testimonial'
    if(confirm(msg)) {
      let reqObj = {
        testimonialId: testimonialId,
        status: status
      }
      this.ngxLoader.start();
      this.testimonialService.ChangeTestimonialStatus(reqObj).then((result) => {
        this.ngxLoader.stop();
        this.GetTestimonials()
      }).catch((err) => {
        this.ngxLoader.stop();
        console.log(err);
        this.toastr.error(err.error.message, 'Failed');
      });
    }
  }

}
