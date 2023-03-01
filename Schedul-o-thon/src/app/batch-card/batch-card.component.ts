import { Component,OnInit } from '@angular/core';
import { DataService } from '../shared/services/data-service.service';

@Component({
  selector: 'app-batch-card',
  templateUrl: './batch-card.component.html',
  styleUrls: ['./batch-card.component.scss']
})
export class BatchCardComponent {
  data !: any[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData()
      .subscribe(data => {
        this.data = data;
      });
  }
} 
