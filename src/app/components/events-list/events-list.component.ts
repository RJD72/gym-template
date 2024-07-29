import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirestoreService } from '../../services/firebase.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css',
})
export class EventsListComponent implements OnInit {
  eventData!: Observable<any>;

  constructor(private firestoreService: FirestoreService) {}
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.eventData = this.firestoreService.getItems();
  }

  deleteData(id: string) {
    this.firestoreService.deleteData(id);
  }
}
