import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FullCalendarModule,
  FullCalendarComponent,
} from '@fullcalendar/angular';

import { CalendarOptions } from '@fullcalendar/core';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})
export class ScheduleComponent implements AfterViewInit, OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  constructor(private calendarService: CalendarService) {}

  calendarOptions: CalendarOptions = this.calendarService.getCalendarOptions();

  ngAfterViewInit(): void {
    this.handleWindowResize();
  }

  ngOnInit(): void {}

  handleWindowResize() {
    const width = window.innerWidth;

    const calendarApi = this.calendarComponent.getApi();
    if (width <= 991) {
      calendarApi.changeView('timeGridDay');
      calendarApi.setOption('headerToolbar', {
        left: 'prev,next',
        center: 'title',
        right: '',
      });
    } else {
      calendarApi.changeView('dayGridMonth');
      calendarApi.setOption('headerToolbar', {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      });
    }
  }
}
