import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../shared/services/event.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent {
  data!: any[];
  constructor(
    private dataService: EventService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.dataService.getData(id).subscribe((data) => {
      this.data = data;
    });
    console.log(this.data);
  }

  onDelete(id: number) {
    // Make a DELETE request to your backend API to delete the event
    this.http
      .delete(`http://localhost:3000/api/del-event/${id}`)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
