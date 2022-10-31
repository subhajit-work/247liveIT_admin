import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BlogService } from '../blog.service';
declare let $: any;

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})

export class EditBlogComponent implements OnInit {
  BlogForm: FormGroup;
  isBlogSubmit: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  blogId: any = 0;
  blog: any;
  isDefaultImage: boolean = true;

  constructor(
    private blogService: BlogService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService
  ) {
    this.route.params.subscribe((params) => {
      this.blogId = params.blogId;
    });
  }

  ngOnInit(): void {
    this.BlogForm = new FormGroup({
      image: new FormControl(''),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });

    console.log('blogId', this.blogId);
    

    this.GetBlog()
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
      this.croppedImage = this.blog.image;
      this.BlogForm.controls['image'].setValue('');
      this.isDefaultImage = true;
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.isDefaultImage = false;
  }
  ClearImage() {
    this.croppedImage = this.blog.image;
    this.BlogForm.controls['image'].setValue('');
    this.isDefaultImage = true;
  }

  GetBlog() {
    this.blogService.GetBlog(this.blogId).then((result) => {
      if (result['code'] == 200 && result['data']) {
        this.blog = result['data'];
        this.croppedImage = this.blog.image && this.blog.image.length > 0 ? this.blog.image : this.croppedImage;
        this.BlogForm.get("title").patchValue(this.blog['title']);
        this.BlogForm.get("description").patchValue(this.blog['description']);
      } else {
        throw result;
      }
    }).catch((err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
    });
  }

  EditBlog(value: any) {
    if (this.isDefaultImage) {
      this.BlogForm.get("image").clearValidators();
      this.BlogForm.get('image').updateValueAndValidity();
    }
    this.isBlogSubmit = true
    // stop here if form is invalid
    if (this.BlogForm.invalid) {
      return;
    }
    let reqData = {
      blogId: this.blogId,
      title: value.title,
      description: value.description
    }
    if (this.isDefaultImage == false) {
      reqData['image'] = this.croppedImage
    }
    console.log('reqData',reqData)
    this.ngxLoader.start();
    this.blogService.EditBlog(reqData).then((result) => {
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