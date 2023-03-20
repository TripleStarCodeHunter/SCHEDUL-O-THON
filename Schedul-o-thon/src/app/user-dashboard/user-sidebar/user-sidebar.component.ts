import { Component } from '@angular/core';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import { faCalendar, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent {
  faCalendar=faCalendar;
  fahome=faHome;
  fahs=faHandshake;
}
