import { Component,OnInit } from '@angular/core';
import { SubbatchService } from '../shared/services/subbatch.service';
@Component({
  selector: 'app-subbatch-card',
  templateUrl: './subbatch-card.component.html',
  styleUrls: ['./subbatch-card.component.scss']
})
export class SubbatchCardComponent {
  data !: any[];
  d=[
    {sub_batch_name:"Java",size:20,location:"Mysuru", start_date:1-1-2023},
    {sub_batch_name:"Python",size:20,location:"Mysuru", start_date:1-1-2023},
    {sub_batch_name:"Big Data",size:20,location:"Mysuru", start_date:1-1-2023},
    {sub_batch_name:"Cloud Computing",size:20,location:"Mysuru", start_date:1-1-2023},
    {sub_batch_name:"C programming",size:20,location:"Mysuru", start_date:1-1-2023},
    {sub_batch_name:"Angular",size:20,location:"Mysuru", start_date:1-1-2023}
  ];
  constructor(private dataService: SubbatchService) { }

  ngOnInit() {
    this.dataService.getData()
      .subscribe(data => {
        this.data = data;
      });
  }
}
