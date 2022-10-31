import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { UsersService } from '../users.service';
declare let $: any;
const API_URL = environment.baseUrl;
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  UserEditForm: FormGroup;
  SocialReportEditForm: FormGroup;
  isPackageSubmit: boolean = false;
  package: any;
  allCategories = [];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  isDefaultImage: boolean = true;
  // subCategories = [{id: 1, value: 'OnSite'}, {id: 2, value: 'Local'}, {id: 3, value: 'National'}];
  subCategories: any = [];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  durations = [{id: 1, value: 'Monthly'}]
  includedFeaturesList = [];
  notIncludedFeaturesList = [];
  userId: any = 0;
  getUserAccountDtls = false;
  getUserSocialReport = false;

  constructor(
    private usersService: UsersService,
    private toastr: ToastrService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((params) => {
      this.userId = params.userId;
    });
  }

  ngOnInit(): void {
    this.UserEditForm = new FormGroup({
      account_id: new FormControl(''),
      properties_id: new FormControl(''),
      view_id: new FormControl(''),
      client_id: new FormControl(''),
      customer_id: new FormControl(''),
      client_secret: new FormControl(''),
      developer_token: new FormControl(''),
      login_customer_id: new FormControl(''),
      refresh_token: new FormControl(''),
      fapp_id: new FormControl(''),
      fappsecret_id: new FormControl(''),
      faccesstoken_id: new FormControl(''),
      user_id: new FormControl(this.userId),
      business_id: new FormControl(''),
      adsmanager_id: new FormControl(''),
      ctm_user: new FormControl(''),
      ctm_password: new FormControl(''),
      ctm_account_id: new FormControl('')
    });
    this.SocialReportEditForm = new FormGroup({
      file: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      month: new FormControl('', [Validators.required]),
      user_id: new FormControl(this.userId)
    });
    this.GetUserdata();
    this.GetSocialReport();
  }

  // Get Package
  GetUserdata() {
    this.usersService.GetUserdata(this.userId).then((result) => {
      if (result['code'] == 200) {
        
        let userGetData = result['data'];
        console.log('userGetData[]', userGetData);
        if(result['data'] == null){
          console.log('add');
          this.getUserAccountDtls = false;
        }else{
          console.log('edit');
          this.getUserAccountDtls = true;
          this.UserEditForm.get("account_id").patchValue(userGetData['account_id']);
          this.UserEditForm.get("properties_id").patchValue(userGetData['properties_id']);
          this.UserEditForm.get("view_id").patchValue(userGetData['view_id']);
          this.UserEditForm.get("client_id").patchValue(userGetData['client_id']);
          this.UserEditForm.get("customer_id").patchValue(userGetData['customer_id']);
          this.UserEditForm.get("client_secret").patchValue(userGetData['client_secret']);
          this.UserEditForm.get("developer_token").patchValue(userGetData['developer_token']);
          this.UserEditForm.get("login_customer_id").patchValue(userGetData['login_customer_id']);
          this.UserEditForm.get("refresh_token").patchValue(userGetData['refresh_token']);
          this.UserEditForm.get("fapp_id").patchValue(userGetData['fapp_id']);
          this.UserEditForm.get("fappsecret_id").patchValue(userGetData['fappsecret_id']);
          this.UserEditForm.get("faccesstoken_id").patchValue(userGetData['faccesstoken_id']);
          this.UserEditForm.get("user_id").patchValue(userGetData['user_id']);
          this.UserEditForm.get("business_id").patchValue(userGetData['business_id']);
          this.UserEditForm.get("adsmanager_id").patchValue(userGetData['adsmanager_id']);
          this.UserEditForm.get("ctm_user").patchValue(userGetData['ctm_user']);
          this.UserEditForm.get("ctm_password").patchValue(userGetData['ctm_password']);
          this.UserEditForm.get("ctm_account_id").patchValue(userGetData['ctm_account_id']);
        }
        this.package = result['data'];
        // this.PackageForm.get("category").patchValue(this.package['packageCategoryId']);
        

       
      } else {
        throw(result)
      }
    }).catch((err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Failed')
    });
  }


  // Add & edit social details
  addUserAccountDtls(value: any) {
    
    this.isPackageSubmit = true
    // stop here if form is invalid
    if (this.UserEditForm.invalid) {
      return;
    }
    let reqData = {
      account_id: value.account_id,
      properties_id: value.properties_id,
      view_id: value.view_id,
      client_id: value.client_id,
      customer_id: value.customer_id,
      client_secret: value.client_secret,
      developer_token: value.developer_token,
      login_customer_id: value.login_customer_id,
      refresh_token: value.refresh_token,
      fapp_id: value.fapp_id,
      fappsecret_id: value.fappsecret_id,
      faccesstoken_id: value.faccesstoken_id,
      user_id: value.user_id,
      business_id: value.business_id,
      adsmanager_id: value.adsmanager_id,
      ctm_user: value.ctm_user,
      ctm_password: value.ctm_password,
      ctm_account_id: value.ctm_account_id
    }
    console.log(reqData)
    this.ngxLoader.start();
    this.usersService.addUserAccountDtls(reqData, this.getUserAccountDtls).then((result) => {
      this.ngxLoader.stop();
      if (result['code'] == 200) {
        this.router.navigate(['/users']);
      } else {
        throw(result)
      }
    }).catch((err) => {
      this.ngxLoader.stop();
      console.log(err);
      this.toastr.error(err.error.message, 'Failed')
    });
  }

  imageSrc: string = '';

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    // var pattern = /pdf-*/;
    var reader = new FileReader();
    // if (!file.type.match(pattern)) {
    //   alert('invalid format');
    //   return;
    // }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log('this.imageSrc', this.imageSrc)
  }

  // Add & edit social report
  addSocialReport(value: any) {
    this.isPackageSubmit = true;
    // stop here if form is invalid
    if (this.SocialReportEditForm.invalid) {
      return;
    }
    let reqData = {
      file: this.imageSrc,
      name: value.name,
      month: value.month,
      user_id: value.user_id
    }
    console.log(reqData)
    this.ngxLoader.start();
    this.usersService.addEditSocialReport(reqData, this.getUserSocialReport).then((result) => {
      this.ngxLoader.stop();
      if (result['code'] == 200) {
        this.router.navigate(['/users']);
      } else {
        throw(result)
      }
    }).catch((err) => {
      this.ngxLoader.stop();
      console.log(err);
      this.toastr.error(err.error.message, 'Failed')
    });
  }

  // Download report

  goToLink(_id){
    let url = API_URL+'/GetSocialReportDetailsD/'+_id;
    console.log('url',url);
    
    window.open(url, "_blank");
  }

  // Get Package
  GetSocialReport() {
    this.usersService.GetSocialReport(this.userId).then((result) => {
      console.log('package@@', result);
      this.package = result['data'];
      if (result['code'] == 200) {
        
        let userGetData = result['data'];
        console.log('userGetData[]', userGetData);
        if(result['data'] == null){
          console.log('add');
          this.getUserSocialReport = false;
        }else{
          console.log('edit');
          this.getUserSocialReport = true;
        }
        
        console.log('package>>', this.package);
        
        // this.PackageForm.get("category").patchValue(this.package['packageCategoryId']);
        

       
      } else {
        throw(result)
      }
    }).catch((err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Failed')
    });
  }
}