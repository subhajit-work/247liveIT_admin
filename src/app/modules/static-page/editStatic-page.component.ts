import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { StaticPageService } from './static-page.service';

@Component({
  selector: 'app-editstatic-page',
  templateUrl: './editStatic-page.component.html',
  styleUrls: []
})
export class EditStaticPageComponent implements OnInit {
  StaticPageForm: FormGroup;
  staticContentId: any = 0;
  staticPage: any;
  isStaticPageSubmit: boolean = false;

  constructor(
    private staticPageService: StaticPageService,
    private toastr: ToastrService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.staticContentId = params.staticContentId;
    });
  }

  ngOnInit(): void {
    this.StaticPageForm = new FormGroup({
      content: new FormControl('', [Validators.required]),
      pageType: new FormControl({value: '', disabled: true})
    });
    this.GetStaticPage();
  }

  // Get all static page
  GetStaticPage () {
    this.staticPageService.GetStaticPage(this.staticContentId).then((result) => {
      if (result['code'] == 200) {
        this.staticPage = result['data'];
        this.StaticPageForm.get("content").patchValue(this.staticPage['content']);
        this.StaticPageForm.get("pageType").patchValue(this.staticPage['pageType']);
      } else {
        throw(result);
      }
    }).catch((err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Failed')
    });
  }

  // Add new Package
  EditStaticPage(value: any) {
    this.isStaticPageSubmit = true
    // stop here if form is invalid
    if (this.StaticPageForm.invalid) {
      return;
    }
    let reqData = {
      staticContentId: parseInt(this.staticContentId),
      content: value.content
    }
    this.ngxLoader.start();
    this.staticPageService.EditStaticPage(reqData).then((result) => {
      this.ngxLoader.stop();
      if (result['code'] == 200) {
        this.router.navigate(['/staticPages']);
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
