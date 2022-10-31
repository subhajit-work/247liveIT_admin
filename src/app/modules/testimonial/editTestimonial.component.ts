import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TestimonialService } from './testimonial.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxUiLoaderService } from 'ngx-ui-loader';
declare let $: any;

@Component({
  selector: 'app-edittestimonial',
  templateUrl: './editTestimonial.component.html',
  styleUrls: [],
})
export class EditTestimonialComponent implements OnInit {
  TestimonialForm: FormGroup;
  isTestimonialSubmit: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  testimonialId: any = 0;
  testimonial: any;
  isDefaultImage: boolean = true;

  constructor(
    private testimonialService: TestimonialService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService
  ) {
    this.route.params.subscribe((params) => {
      this.testimonialId = params.testimonialId;
    });
  }

  ngOnInit(): void {
    this.TestimonialForm = new FormGroup({
      image: new FormControl(''),
      name: new FormControl('', [Validators.maxLength(50),Validators.minLength(1)]),
      description: new FormControl('', [Validators.required])
    });

    this.GetTestimonial()
  }

  // Upload ingredient Image
  fileChangeEvent(event: any): void {
    let fileName = event.target.value;
    let extension = fileName.split('.').pop();
    if (event.target.value.length > 0 && (extension == 'png' || extension == 'jpg' || extension == 'jpeg')) {
      this.imageChangedEvent = event;
      $("#cropImageModal").modal('show');
    } else {
      this.toastr.error('Failed', 'Please select valid image');
      this.croppedImage = this.testimonial.image;
      this.TestimonialForm.controls['image'].setValue('');
      this.isDefaultImage = true;
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.isDefaultImage = false;
  }
  ClearImage() {
    this.croppedImage = this.testimonial.image;
    this.TestimonialForm.controls['image'].setValue('');
    this.isDefaultImage = true;
  }

  GetTestimonial() {
    this.testimonialService.GetTestimonial(this.testimonialId).then((result) => {
      if (result['code'] == 200 && result['data']) {
        this.testimonial = result['data'];
        this.croppedImage = this.testimonial.image && this.testimonial.image.length > 0 ? this.testimonial.image : this.croppedImage;
        this.TestimonialForm.get("name").patchValue(this.testimonial['name']);
        this.TestimonialForm.get("description").patchValue(this.testimonial['content']);
      } else {
        throw result;
      }
    }).catch((err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
    });
  }

  EditTestimonial(value: any) {
    if (this.isDefaultImage) {
      this.TestimonialForm.get("image").clearValidators();
      this.TestimonialForm.get('image').updateValueAndValidity();
    }
    this.isTestimonialSubmit = true
    // stop here if form is invalid
    if (this.TestimonialForm.invalid) {
      return;
    }
    let reqData = {
      testimonialId: this.testimonial['testimonialId'],
      name: value.name,
      content: value.description
    }
    if (this.isDefaultImage == false) {
      reqData['image'] = this.croppedImage
    }
    console.log(reqData)
    this.ngxLoader.start();
    this.testimonialService.EditTestimonial(reqData).then((result) => {
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