import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "['app-admin-sidebar','ngbd-collapse-horizontal']",
  // selector: 'ngbd-collapse-horizontal',
	standalone: true,
	imports: [NgbCollapseModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent {
  public isCollapsed = false;
}
