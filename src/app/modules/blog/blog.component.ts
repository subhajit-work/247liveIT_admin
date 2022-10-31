import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {

  blogs: any;
  pageIndex: number = 1;
  perPage: number = 10;
  searchKey: string;
  blogsCount: number = 0;

  constructor(private blogService: BlogService, private toastr: ToastrService, private ngxLoader: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.GetBlogs()
  }

  // Get all Blogs
  GetBlogs () {
    let reqObj = {
      pageIndex: (this.pageIndex - 1),
      perPage: this.perPage,
      searchKey: this.searchKey
    }
    this.blogs = [];
    this.ngxLoader.start();
    this.blogService.GetBlogs(reqObj).then((result) => {
      this.ngxLoader.stop();
      this.blogs = result['data']
      this.blogsCount = result['totalCount']
    }).catch((err) => {
      this.ngxLoader.stop();
      console.log(err);
      this.toastr.error(err.error.message, 'Failed');
    });
  }

  // Search blogs
  SearchBlogs () {
    this.pageIndex = 1;
    this.perPage = 10;
    this.GetBlogs();
  }

  pageChange(e) {
    this.pageIndex = e;
    this.perPage = this.perPage;
    this.searchKey = this.searchKey;
    this.GetBlogs();
  }

  // Active/Inactive blog
  ChangeBlogStatus(blogId, status) {
    let msg = status === 1 ? 'Are you sure to activate this Blog' : 'Are you sure to deactivate this Blog'
    if(confirm(msg)) {
      let reqObj = {
        blogId: blogId,
        status: status
      }
      this.ngxLoader.start();
      this.blogService.ChangeBlogStatus(reqObj).then((result) => {
        this.ngxLoader.stop();
        this.GetBlogs()
      }).catch((err) => {
        this.ngxLoader.stop();
        console.log(err);
        this.toastr.error(err.error.message, 'Failed');
      });
    }
  }

}