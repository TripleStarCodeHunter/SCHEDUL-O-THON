import { Component } from '@angular/core';
import { DataService } from '../shared/services/data-service.service';
import { AdminService } from '../shared/services/admin.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {

  data !: any[];
  username:string='';
  d = [
    { batch_name: "2022 Aug Java A", subbatch_name: "Subbatch 1", section_name: "Java", instructor_name: "ABC", date: "25/02/2023" },
    { batch_name: "2022 Aug Java B", subbatch_name: "Subbatch 2", section_name: "Java", instructor_name: "ABC", date: "25/02/2023" },
    { batch_name: "2022 Aug Java A", subbatch_name: "Subbatch 3", section_name: "Java", instructor_name: "ABC", date: "25/02/2023" },
  ];

  constructor(private dataService: DataService,private adminService:AdminService) { }

  ngOnInit() {
    this.dataService.getData()
      .subscribe(data => {
        this.data = data;
      });
      
  }

}
