import { Component,OnInit } from '@angular/core';
import { DataService } from '../shared/services/data-service.service';

@Component({
  selector: 'app-batch-card',
  templateUrl: './batch-card.component.html',
  styleUrls: ['./batch-card.component.scss']
})
export class BatchCardComponent {
  data !: any[];
  d=[
    {batch_name:"2022 Aug - Big Data",subbatch_count:5,batch_size:120,location:"Chennai",start_date:"2022-08-18"},
    {batch_name:"2022 May - Data Analytics and Data Science",subbatch_count:10,batch_size:180,location:"Noida",start_date:"2022-05-18"},
    {batch_name:"2022 Aug - Big Data",subbatch_count:5,batch_size:120,location:"Chennai",start_date:"2022-01-18"},
    {batch_name:"2022 Aug - Big Data",subbatch_count:5,batch_size:120,location:"Chennai",start_date:"2022-01-18"},
    {batch_name:"2022 Aug - Big Data",subbatch_count:5,batch_size:120,location:"Chennai",start_date:"2022-01-18"}
  ];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData()
      .subscribe(data => {
        this.data = data;
      });
  }
} 
