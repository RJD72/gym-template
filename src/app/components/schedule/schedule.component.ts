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
    if (this.calendarComponent) {
      this.calendarService.setCalendarComponent(this.calendarComponent);
      this.calendarService.handleWindowResize();
      window.addEventListener('resize', () =>
        this.calendarService.handleWindowResize()
      );
    }
  }

  ngOnInit(): void {}
}
