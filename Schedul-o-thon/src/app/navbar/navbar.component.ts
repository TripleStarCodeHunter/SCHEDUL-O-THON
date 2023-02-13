import { Component,OnInit } from '@angular/core';
declare var AOS:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  ngOnInit() {
      AOS.init();
  }
}
