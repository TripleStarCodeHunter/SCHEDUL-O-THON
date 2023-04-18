import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: "['app-admin-sidebar','ngbd-collapse-horizontal']",
  // selector: 'ngbd-collapse-horizontal',
  exportAs: 'ngbCollapse',
  standalone: true,
  imports: [NgbCollapseModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
})
export class AdminSidebarComponent {
  public isCollapsed = false;
  user = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const options = {
      withCredentials: true,
    };

    this.http
      .get('http://localhost:3000/api/login', options)
      .subscribe((response) => {
        console.log(response);
        const myObject: { [key: string]: any } = response;
        const auth = myObject['username'];
        this.user = auth;
      });
  }
}
