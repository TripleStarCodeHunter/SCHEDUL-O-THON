import { Component,OnInit } from '@angular/core';
declare var AOS:any;
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{
  ngOnInit() {
      AOS.init();
  }
}
