import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PackagesService } from './packages.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-addpackage',
  templateUrl: './addPackage.component.html',
  styleUrls: [],
})
export class AddPackageComponent implements OnInit {
  PackageForm: FormGroup;
  isPackageSubmit: boolean = false;
  package: any;
  allCategories = [];
  // subCategories = [{id: 1, value: 'OnSite'}, {id: 2, value: 'Local'}, {id: 3, value: 'National'}];
  subCategories: any = [];
  types = [{id: 1, value: 'STARTER'}, {id: 2, value: 'INTERMEDIATE'}, {id: 3, value: 'STANDARD'}];
  durations = [{id: 1, value: 'Monthly'}]
  includedFeaturesList = [];
  notIncludedFeaturesList = [];

  constructor(
    private packagesService: PackagesService,
    private toastr: ToastrService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService,
  ) {}

  ngOnInit(): void {
    this.PackageForm = new FormGroup({
      name: new FormControl('', [Validators.required,Validators.maxLength(50),Validators.minLength(1)]),
      category: new FormControl('', [Validators.required]),
      subCategory: new FormControl(''),
      type: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      amount: new FormControl(0.00, [Validators.required, Validators.min(1)]),
      includedFeature: new FormControl(''),
      notIncludedFeature: new FormControl(''),
      description: new FormControl('', [Validators.required])
    });

    this.GetCategories();
  }

  onCategoryChange(event) {
    console.log(event.target.value)
    for (let i=0; i<this.allCategories.length; i++) {
      if (event.target.value == this.allCategories[i].packageCategoryId) {
        this.subCategories = this.allCategories[i]['subCategories'];
        break;
      }
    }
  }

  // Get all categories of package
  GetCategories() {
    this.allCategories = [];
    this.packagesService.GetCategories().then((result) => {
      if (result['data'] && result['data'].length > 0) {
        this.allCategories = result['data']
        console.log(this.allCategories)
      } else {
        throw(result);
      }
    }).catch((err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Failed')
    });
  }

  // Add feature in included feature list
  AddIncludedFeature(type) {
    if (type === 1) {
      let feature = this.PackageForm.get('includedFeature').value;
      if (feature && feature.trim().length > 0) {
        this.includedFeaturesList.push(feature);
      }
      this.PackageForm.get("includedFeature").patchValue('');
    } else if (type === 2) {
      let feature = this.PackageForm.get('notIncludedFeature').value;
      if (feature && feature.trim().length > 0) {
        this.notIncludedFeaturesList.push(feature);
      }
      this.PackageForm.get("notIncludedFeature").patchValue('');
    }
  }

  // Remove feature from list
  RemoveFeature(text, type) {
    console.log(text, type)
    if (type === 1) {
      this.includedFeaturesList = this.includedFeaturesList.filter(e => e !== text);
    } else if (type === 2) {
      this.notIncludedFeaturesList = this.notIncludedFeaturesList.filter(e => e !== text);
    }
  }

  // Add new Reason
  AddPackage(value: any) {
    this.isPackageSubmit = true
    // stop here if form is invalid
    if (this.PackageForm.invalid) {
      return;
    }
    let reqData = {
      name: value.name,
      category: parseInt(value.category),
      subCategory: value.subCategory ? parseInt(value.subCategory) : null,
      type: parseInt(value.type),
      duration: parseInt(value.duration),
      amount: value.amount,
      includedFeature: this.includedFeaturesList,
      notIncludedFeature: this.notIncludedFeaturesList,
      description: value.description
    }
    console.log(reqData)
    this.ngxLoader.start();
    this.packagesService.AddPackage(reqData).then((result) => {
      this.ngxLoader.stop();
      if (result['code'] == 200) {
        this.router.navigate(['/packages']);
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