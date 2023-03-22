import { Component } from '@angular/core';
import { SectionDataService } from '../shared/services/section-data.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-section-cards',
  templateUrl: './section-cards.component.html',
  styleUrls: ['./section-cards.component.scss']
})
export class SectionCardsComponent {
  data !: any[];
  // d=[
  //   {section_name:"2022 Aug Java A",strength:30,track_name:"Java",classroom_name:"Mysuru-Aug-2022-A",schedule:"link here",section_id:"A"},
  //   {section_name:"2022 Aug Java B",strength:30,track_name:"Java",classroom_name:"Mysuru-Aug-2022-B",schedule:"link here",section_id:"B"},
  //   {section_name:"2022 Aug Java A",strength:30,track_name:"Java",classroom_name:"Mysuru-Aug-2022-C",schedule:"link here",section_id:"C"},
  // ];

  constructor(private dataService: SectionDataService, private route:ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('sub_batch_id');
    this.dataService.getData(id)
      .subscribe(data => {
        this.data = data;
      });
  }
}
