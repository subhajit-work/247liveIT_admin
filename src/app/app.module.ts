import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './default.request.header';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CKEditorModule } from 'ckeditor4-angular';
import { ChartsModule } from 'ng2-charts';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { LoginService } from './modules/login/login.service';
import { ContentComponent } from './modules/content/content.component';
import { FooterComponent } from './layout/blocks/footer.component';
import { HeaderComponent } from './layout/blocks/header.component';
import { SidebarComponent } from './layout/blocks/sidebar.component';
import { LayoutService } from './layout/blocks/layout.service';
import { AccessGuard } from './modules/login/authentication.service';
import { routing } from './app.routing';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DashboardService } from './modules/dashboard/dashboard.service';
import { UsersComponent } from './modules/users/users.component';
import { UsersService } from './modules/users/users.service';
import { ViewUserComponent } from './modules/users/viewUser.component';
import { PackagesComponent } from './modules/packages/packages.component';
import { PackagesService } from './modules/packages/packages.service';
import { AddPackageComponent } from './modules/packages/addPackage.component';
import { EditPackageComponent } from './modules/packages/editPackage.component';
import { StaticPageComponent } from './modules/static-page/static-page.component';
import { StaticPageService } from './modules/static-page/static-page.service';
import { EditStaticPageComponent } from './modules/static-page/editStatic-page.component';
import { ChangePasswordComponent } from './modules/dashboard/changePassword.component';
import { TestimonialComponent } from './modules/testimonial/testimonial.component';
import { TestimonialService } from './modules/testimonial/testimonial.service';
import { AddTestimonialComponent } from './modules/testimonial/addTestimonial.component';
import { EditTestimonialComponent } from './modules/testimonial/editTestimonial.component';
import { CouponComponent } from './modules/coupon/coupon.component';
import { AddCouponComponent } from './modules/coupon/addCoupon.component';
import { CouponService } from './modules/coupon/coupon.service';
import { EditCouponComponent } from './modules/coupon/editCoupon.component';
import { AddUserComponent } from './modules/users/add-user/add-user.component';
import { EditUserComponent } from './modules/users/edit-user/edit-user.component';
import { MetatagComponent } from './modules/metatag/metatag.component';
import { AddMetatagComponent } from './modules/metatag/add-metatag/add-metatag.component';
import { EditMetatagComponent } from './modules/metatag/edit-metatag/edit-metatag.component';
import { BlogComponent } from './modules/blog/blog.component';
import { AddBlogComponent } from './modules/blog/add-blog/add-blog.component';
import { EditBlogComponent } from './modules/blog/edit-blog/edit-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContentComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    UsersComponent,
    ViewUserComponent,
    PackagesComponent,
    AddPackageComponent,
    EditPackageComponent,
    StaticPageComponent,
    EditStaticPageComponent,
    ChangePasswordComponent,
    TestimonialComponent,
    AddTestimonialComponent,
    EditTestimonialComponent,
    CouponComponent,
    AddCouponComponent,
    EditCouponComponent,
    AddUserComponent,
    EditUserComponent,
    MetatagComponent,
    AddMetatagComponent,
    EditMetatagComponent,
    BlogComponent,
    AddBlogComponent,
    EditBlogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxUiLoaderModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    CKEditorModule,
    ChartsModule,
    ImageCropperModule
  ],
  providers: [
    AccessGuard,
    LoginService,
    LayoutService,
    DashboardService,
    UsersService,
    PackagesService,
    StaticPageService,
    TestimonialService,
    CouponService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
