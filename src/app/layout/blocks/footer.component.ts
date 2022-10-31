import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  current_year;
  constructor() { }

  ngOnInit() {
    let d = new Date();
    this.current_year = d.getFullYear();
  }

}
