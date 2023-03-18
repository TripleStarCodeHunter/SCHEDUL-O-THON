import { Component } from '@angular/core';
import { DataService } from '../shared/services/data-service.service';

@Component({
  selector: 'app-section-cards',
  templateUrl: './section-cards.component.html',
  styleUrls: ['./section-cards.component.scss']
})
export class SectionCardsComponent {
  data !: any[];
  d=[
    {section_name:"2022 Aug - Big Data",strength:30,track_name:"Java",classroom_name:"Mysuru-Aug-2022-A",schedule:"link here",section_id:"A"},
    {section_name:"2022 May - Data Analytics",strength:30,track_name:"Java",classroom_name:"Mysuru-Aug-2022-B",schedule:"link here",section_id:"B"},
    {section_name:"2022 Aug - Big Data",strength:30,track_name:"Java",classroom_name:"Mysuru-Aug-2022-C",schedule:"link here",section_id:"C"},
  ];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData()
      .subscribe(data => {
        this.data = data;
      });
  }
}
