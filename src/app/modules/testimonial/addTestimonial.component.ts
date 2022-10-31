import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TestimonialService } from './testimonial.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ImageCroppedEvent } from 'ngx-image-cropper';
declare let $: any;

@Component({
  selector: 'app-addtestimonial',
  templateUrl: './addTestimonial.component.html',
  styleUrls: [],
})
export class AddTestimonialComponent implements OnInit {
  TestimonialForm: FormGroup;
  isTestimonialSubmit: boolean = false;
  testimonial: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isDefaultImage: boolean = true;

  constructor(
    private testimonialService: TestimonialService,
    private toastr: ToastrService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
  ) {}

  ngOnInit(): void {
    this.TestimonialForm = new FormGroup({
      image: new FormControl(''),
      name: new FormControl('', [Validators.maxLength(50),Validators.minLength(1)]),
      description: new FormControl('', [Validators.required])
    });
  }

  // Upload ingredient image
  fileChangeEvent(event: any): void {
    let fileName = event.target.value;
    let extension = fileName.split('.').pop();
    if (event.target.value.length > 0 && (extension == 'png' || extension == 'jpg' || extension == 'jpeg')) {
      this.imageChangedEvent = event;
      $("#cropImageModal").modal('show');
    } else {
      this.toastr.error('Failed', 'Please select valid image');
      this.croppedImage = '';
      this.TestimonialForm.controls['image'].setValue('');
      this.isDefaultImage = true;
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  ClearImage() {
    this.croppedImage = '';
    this.TestimonialForm.controls['image'].setValue('');
  }

  // Add new Reason
  AddTestimonial(value: any) {
    this.isTestimonialSubmit = true
    // stop here if form is invalid
    if (this.TestimonialForm.invalid) {
      return;
    }
    let reqData = {
      image: this.croppedImage,
      name: value.name,
      content: value.description
    }
    console.log(reqData)
    this.ngxLoader.start();
    this.testimonialService.AddTestimonial(reqData).then((result) => {
      this.ngxLoader.stop();
      if (result['code'] == 200) {
        this.router.navigate(['/testimonials']);
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