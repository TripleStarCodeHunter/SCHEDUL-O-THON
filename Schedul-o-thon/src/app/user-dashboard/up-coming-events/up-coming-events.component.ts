import { Component } from '@angular/core';

@Component({
  selector: 'app-up-coming-events',
  templateUrl: './up-coming-events.component.html',
  styleUrls: ['./up-coming-events.component.scss']
})
export class UpComingEventsComponent {
  d=[
    {sno:1,event:"Webinar",date:"21-03-2023"},
    {sno:2,event:"Fun event",date:"23-01-2023"},
    {sno:3,event:"Bootcamp on Data Science",date:"24-01-2023"}//Test value
  ];
}
