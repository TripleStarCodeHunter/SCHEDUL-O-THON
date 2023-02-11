/*
  AppComponent is the topmost component by default.
  Other components are created as a child of AppComponent.
*/

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Schedul-o-thon';
}
