import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PackagesService } from './packages.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-editpackage',
  templateUrl: './editPackage.component.html',
  styleUrls: [],
})
export class EditPackageComponent implements OnInit {
  PackageForm: FormGroup;
  isPackageSubmit: boolean = false;
  packageId: any = 0;
  package: any;
  allCategories = [];
  // subCategories = [{id: 1, value: 'OnSite'}, {id: 2, value: 'Local'}, {id: 3, value: 'National'}];
  subCategories: any = [];
  types = [{id: 1, value: 'STARTER'}, {id: 2, value: 'INTERMEDIATE'}, {id: 3, value: 'STANDARD'}];
  includedFeaturesList = [];
  notIncludedFeaturesList = [];

  constructor(
    private packagesService: PackagesService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private ngxLoader: NgxUiLoaderService,
  ) {
    this.route.params.subscribe((params) => {
      this.packageId = params.packageId;
    });
  }

  ngOnInit(): void {
    this.PackageForm = new FormGroup({
      category: new FormControl('', [Validators.required]),
      subCategory: new FormControl(''),
      type: new FormControl('', [Validators.required]),
      includedFeature: new FormControl(''),
      notIncludedFeature: new FormControl(''),
      description: new FormControl('', [Validators.required])
    });

    this.GetCategories();
    this.GetPackage()
  }

  onCategoryChange(event) {
    for (let i=0; i<this.allCategories.length; i++) {
      if (event.target.value == this.allCategories[i].packageCategoryId) {
        this.subCategories = this.allCategories[i]['subCategories'];
        break;
      }
    }
  }

  GetCategories() {
    this.allCategories = [];
    this.packagesService.GetCategories().then((result) => {
      if (result['data'] && result['data'].length > 0) {
        this.allCategories = result['data']
      } else {
        throw(result);
      }
    }).catch((err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Failed')
    });
  }

  // Get Package
  GetPackage() {
    this.packagesService.GetPackage(this.packageId).then((result) => {
      if (result['code'] == 200) {
        this.package = result['data'];
        // this.PackageForm.get("category").patchValue(this.package['packageCategoryId']);
        this.PackageForm.get("category").patchValue(this.package['parentCategoryId']);
        this.PackageForm.get("type").patchValue(this.package['type']);
        this.PackageForm.get("description").patchValue(this.package['description']);

        // To set included features in page
        let includedFeatures = this.package.includedFeatures.split(';');
        if (includedFeatures && includedFeatures.length > 0) {
          for (let i=0; i<includedFeatures.length; i++) {
            this.includedFeaturesList.push(includedFeatures[i]);
          }
        }

        // To set not-included features in page
        let notIncludedFeatures = this.package.notIncludedFeatures.split(';');
        if (notIncludedFeatures && notIncludedFeatures.length > 0) {
          for (let i=0; i<notIncludedFeatures.length; i++) {
            this.notIncludedFeaturesList.push(notIncludedFeatures[i]);
          }
        }

        // To set sub categories
        for (let i=0; i<this.allCategories.length; i++) {
          if (this.package['parentCategoryId'] == this.allCategories[i].packageCategoryId) {
            this.subCategories = this.allCategories[i]['subCategories'];
            break;
          }
        }
        this.PackageForm.get("subCategory").patchValue(this.package['subCategory']);
      } else {
        throw(result)
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

  // Add new Package
  EditPackage(value: any) {
    this.isPackageSubmit = true
    // stop here if form is invalid
    if (this.PackageForm.invalid) {
      return;
    }
    let reqData = {
      packageId: parseInt(this.packageId),
      packageCategoryId: parseInt(value.category),
      subCategory: value.subCategory ? parseInt(value.subCategory) : null,
      type: parseInt(value.type),
      includedFeature: this.includedFeaturesList,
      notIncludedFeature: this.notIncludedFeaturesList,
      description: value.description
    }
    this.ngxLoader.start();
    this.packagesService.EditPackage(reqData).then((result) => {
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