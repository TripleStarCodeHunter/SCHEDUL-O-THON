import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent {
  onsubmit()
  {
    this.router.navigateByUrl('/profile');
  }
  constructor(private router:Router){}
}
