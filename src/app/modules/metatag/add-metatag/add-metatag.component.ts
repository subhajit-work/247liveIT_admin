import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MetatagService } from '../metatag.service';
declare let $: any;

@Component({
  selector: 'app-add-metatag',
  templateUrl: './add-metatag.component.html',
  styleUrls: ['./add-metatag.component.css']
})

export class AddMetatagComponent implements OnInit {
  MetatagForm: FormGroup;
  isMetatagSubmit: boolean = false;
  metatag: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isDefaultImage: boolean = true;

  constructor(
    private metatagService: MetatagService,
    private toastr: ToastrService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
  ) {}

  ngOnInit(): void {
    this.MetatagForm = new FormGroup({
      tags: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required])
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
      this.MetatagForm.controls['image'].setValue('');
      this.isDefaultImage = true;
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  ClearImage() {
    this.croppedImage = '';
    this.MetatagForm.controls['image'].setValue('');
  }
  // onTypeChange(event)
  // {
  //   console.log(event.target.value);
  // }
  // onPositionChange(event)
  // {
  //   // console.log(event);
  //   console.log(event.target.value);

  // }
  // Add new Reason
  AddMetatag(value: any) {
    console.log(value);
    this.isMetatagSubmit = true
    // stop here if form is invalid
    if (this.MetatagForm.invalid) {
      return;
    }
    let type;
    let position;
    if(value.type=='1')
    {
       type="blog";
    }
    else
    {
      type="common";

    }
    if(value.position=='1')
    {
      position="header";
    }
    else
    {
      position="footer";

    }
    let reqData = {
      tags: value.tags,
      type: type,
      position:position
    }

    this.ngxLoader.start();
    this.metatagService.AddMetatag(reqData).then((result) => {
      this.ngxLoader.stop();
      if (result['code'] == 200) {
        this.router.navigate(['/metatag']);
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