import {Routes, RouterModule} from '@angular/router';
import {AccessGuard} from './modules/login/authentication.service';
import { ContentComponent } from './modules/content/content.component';
import { LoginComponent } from './modules/login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { UsersComponent } from './modules/users/users.component';
import { ViewUserComponent } from './modules/users/viewUser.component';
import { PackagesComponent } from './modules/packages/packages.component';
import { AddPackageComponent } from './modules/packages/addPackage.component';
import { EditPackageComponent } from './modules/packages/editPackage.component';
import { StaticPageComponent } from './modules/static-page/static-page.component';
import { EditStaticPageComponent } from './modules/static-page/editStatic-page.component';
import { ChangePasswordComponent } from './modules/dashboard/changePassword.component';
import { TestimonialComponent } from './modules/testimonial/testimonial.component';
import { AddTestimonialComponent } from './modules/testimonial/addTestimonial.component';
import { EditTestimonialComponent } from './modules/testimonial/editTestimonial.component';
import { CouponComponent } from './modules/coupon/coupon.component';
import { AddCouponComponent } from './modules/coupon/addCoupon.component';
import { EditCouponComponent } from './modules/coupon/editCoupon.component';
import { EditUserComponent } from './modules/users/edit-user/edit-user.component';
import { MetatagComponent } from './modules/metatag/metatag.component';
import { AddMetatagComponent } from './modules/metatag/add-metatag/add-metatag.component';
import { EditMetatagComponent } from './modules/metatag/edit-metatag/edit-metatag.component';
import { BlogComponent } from './modules/blog/blog.component';
import { AddBlogComponent } from './modules/blog/add-blog/add-blog.component';
import { EditBlogComponent } from './modules/blog/edit-blog/edit-blog.component';

const appRoutes: Routes = [
  {
    path: '',
    canActivate: [ AccessGuard ],
    component: ContentComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: 'changePassword', component: ChangePasswordComponent },
      { path: 'users', component: UsersComponent },
      { path: 'edit-user/:userId', component: EditUserComponent },
      { path: 'user/:userId', component: ViewUserComponent },
      { path: 'packages', component: PackagesComponent },
      { path: 'addPackage', component: AddPackageComponent },
      { path: 'package/:packageId', component: EditPackageComponent },
      { path: 'staticPages', component: StaticPageComponent },
      { path: 'staticPages/:staticContentId', component: EditStaticPageComponent },
      { path: 'testimonials', component: TestimonialComponent },
      { path: 'addTestimonial', component: AddTestimonialComponent },
      { path: 'testimonial/:testimonialId', component: EditTestimonialComponent },
      { path: 'coupons', component: CouponComponent },
      { path: 'addCoupon', component: AddCouponComponent },
      { path: 'coupon/:couponId', component: EditCouponComponent },
      { path: 'metatag', component: MetatagComponent },
      { path: 'addMetatag', component: AddMetatagComponent },
      { path: 'metatag/:metatagId', component: EditMetatagComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'addBlog', component: AddBlogComponent },
      { path: 'blog/:blogId', component: EditBlogComponent },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

export const routing = RouterModule.forRoot(appRoutes, {useHash: false});