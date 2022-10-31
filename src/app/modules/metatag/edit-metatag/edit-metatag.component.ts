import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MetatagService } from '../metatag.service';
declare let $: any;

@Component({
  selector: 'app-edit-metatag',
  templateUrl: './edit-metatag.component.html',
  styleUrls: ['./edit-metatag.component.css']
})

export class EditMetatagComponent implements OnInit {
  MetatagForm: FormGroup;
  isMetatagSubmit: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  metatagId: any = 0;
  metatag: any;
  isDefaultImage: boolean = true;

  constructor(
    private metatagService: MetatagService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService
  ) {
    this.route.params.subscribe((params) => {
      this.metatagId = params.metatagId;
    });
  }

  ngOnInit(): void {
    this.MetatagForm = new FormGroup({
      tags: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required])
    });

    console.log('metatagId', this.metatagId);
    

    this.GetMetatag()
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
      this.croppedImage = this.metatag.image;
      this.MetatagForm.controls['image'].setValue('');
      this.isDefaultImage = true;
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.isDefaultImage = false;
  }
  ClearImage() {
    this.croppedImage = this.metatag.image;
    this.MetatagForm.controls['image'].setValue('');
    this.isDefaultImage = true;
  }

  GetMetatag() {
    let type;
    let position;
    this.metatagService.GetMetatag(this.metatagId).then((result) => {
      if (result['code'] == 200 && result['data']) {
        this.metatag = result['data'];
        if(this.metatag['type']=="blog")
        {
          type="1";
        }
        else
        {
          type="2";

        }
        if(this.metatag['position']=="header")
        {
          position="1";
        }
        else
        {
          position="2";
        }
        // console.log(position);
        // console.log(type);
        
        this.MetatagForm.get("tags").patchValue(this.metatag['tags']);
        this.MetatagForm.get("type").patchValue(type);
        this.MetatagForm.get("position").patchValue(position);
      } else {
        throw result;
      }
    }).catch((err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
    });
  }

  EditMetatag(value: any) {
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
      metatagId: this.metatagId,
      tags: value.tags,
      position: position,
      type:type
    }
    console.log('reqData',reqData)
    this.ngxLoader.start();
    this.metatagService.EditMetatag(reqData).then((result) => {
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