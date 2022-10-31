import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sidebarToggle = true;

  constructor(
    @Inject(DOCUMENT) document,
    private r: Renderer2,
    private router: Router,
    private toastr: ToastrService,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {}

  Logout() {
    this.layoutService.Logout().then((result) => {
      localStorage.removeItem('email');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }).catch((err) => {
      console.log(err);
      this.toastr.error(err.error.message, 'Failed')
    });
  }
}