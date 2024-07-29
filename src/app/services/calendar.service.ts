import { Injectable } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import rrulePlugin from '@fullcalendar/rrule';
import { FirestoreService } from './firebase.service';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',

    windowResize: this.handleWindowResize.bind(this),
    views: {
      timeGridWeek: {
        titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
        slotMinTime: '06:00:00', // Start time for the day
        slotMaxTime: '22:00:00', // End time for the day
      },
      timeGridDay: {
        titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
        slotMinTime: '06:00:00', // Start time for the day
        slotMaxTime: '22:00:00', // End time for the day
      },
    },
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin],
    businessHours: [
      {
        daysOfWeek: [1, 2, 3, 4, 5, 6],
        startTime: '06:00',
        endTime: '22:00',
      },
    ],
    events: [],

    dayMaxEventRows: true,
    editable: false, // Set editable to false to prevent public editing
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    allDaySlot: false,
  };

  private eventSubscription: Subscription | undefined;
  private calendarComponent: FullCalendarComponent | undefined;

  constructor(private fireStoreService: FirestoreService) {
    this.initializeEvents();
  }

  setCalendarComponent(calendarComponent: FullCalendarComponent): void {
    this.calendarComponent = calendarComponent;
  }

  private initializeEvents(): any {
    this.fireStoreService.getItems().subscribe((events) => {
      this.calendarOptions.events = events;
      console.log(events);
    });
  }

  getCalendarOptions(): CalendarOptions {
    return this.calendarOptions;
  }

  addEvent(event: EventInput): void {
    this.calendarOptions.events = [
      ...(this.calendarOptions.events as EventInput[]),
      event,
    ];
  }

  updateEvent(eventId: string, updatedEvent: EventInput) {
    this.calendarOptions.events = (
      this.calendarOptions.events as EventInput[]
    ).map((event) =>
      event.id === eventId ? { ...event, ...updatedEvent } : event
    );
  }

  handleWindowResize(): void {
    if (!this.calendarOptions) return;

    const width = window.innerWidth;

    const calendarApi = this.calendarComponent?.getApi();
    if (width <= 991) {
      calendarApi?.changeView('timeGridDay');
      calendarApi?.setOption('headerToolbar', {
        left: 'prev,next',
        center: 'title',
        right: '',
      });
    } else {
      calendarApi?.changeView('dayGridMonth');
      calendarApi?.setOption('headerToolbar', {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      });
    }
  }

  ngOnDestroy(): void {
    this.eventSubscription?.unsubscribe();
  }
}
