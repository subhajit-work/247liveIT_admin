import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BlogService } from '../blog.service';
declare let $: any;

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})


export class AddBlogComponent implements OnInit {
  BlogForm: FormGroup;
  isBlogSubmit: boolean = false;
  blog: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isDefaultImage: boolean = true;

  constructor(
    private blogService: BlogService,
    private toastr: ToastrService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
  ) {}

  ngOnInit(): void {
    this.BlogForm = new FormGroup({
      image: new FormControl(''),
      title: new FormControl('', [Validators.required]),
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
      this.BlogForm.controls['image'].setValue('');
      this.isDefaultImage = true;
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  ClearImage() {
    this.croppedImage = '';
    this.BlogForm.controls['image'].setValue('');
  }

  // Add new Reason
  AddBlog(value: any) {
    this.isBlogSubmit = true
    // stop here if form is invalid
    if (this.BlogForm.invalid) {
      return;
    }
    let reqData = {
      title: value.title,
      description: value.description,
      image: this.croppedImage
    }
    console.log(reqData)
    this.ngxLoader.start();
    this.blogService.AddBlog(reqData).then((result) => {
      this.ngxLoader.stop();
      if (result['code'] == 200) {
        this.router.navigate(['/blog']);
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