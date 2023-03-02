import { Component,OnInit } from '@angular/core';
import { SubbatchService } from '../shared/services/subbatch.service';
@Component({
  selector: 'app-subbatch-card',
  templateUrl: './subbatch-card.component.html',
  styleUrls: ['./subbatch-card.component.scss']
})
export class SubbatchCardComponent {
  data !: any[];

  constructor(private dataService: SubbatchService) { }

  ngOnInit() {
    this.dataService.getData()
      .subscribe(data => {
        this.data = data;
      });
  }
}
