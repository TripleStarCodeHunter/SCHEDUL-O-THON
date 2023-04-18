import { Component, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from '../event-utils';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  onsubmit()
  {
    this.router.navigateByUrl('/profile');
  }
  
calendarVisible = true;
  title='fullCal';
  Events: any[]=[];
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor(private httpClient: HttpClient,private changeDetector: ChangeDetectorRef,private router:Router) {
  }
  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.httpClient.get<any[]>('/api/events').subscribe((events) => {
      this.Events = events;
      this.calendarOptions.events = this.Events.map((event) => ({
        title: event.event_name,
        start: event.start_date,
        end: event.end_date,
        allDay: true,
        description: event.description
      }));
    });
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  currentEvent:any
  handleEventClick(clickInfo: EventClickArg) {
    this.currentEvent = {
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
      description: clickInfo.event.extendedProps['description'] || 'abc'
    };
  }
  

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
}
