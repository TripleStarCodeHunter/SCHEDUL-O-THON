import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap/collapse/collapse.module';

@Component({
  selector: "['app-admin-navbar','ngbd-collapse-horizontal']",
  exportAs: 'ngbCollapse',
  standalone: true,
  imports: [NgbCollapseModule],
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent {
  public isCollapsed = false;
}
