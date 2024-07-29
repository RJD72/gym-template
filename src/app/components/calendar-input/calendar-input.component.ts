import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { FirestoreService } from '../../services/firebase.service';
import { FooterComponent } from '../footer/footer.component';
import { EventsListComponent } from '../events-list/events-list.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-calendar-input',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    FooterComponent,
    EventsListComponent,
  ],
  templateUrl: './calendar-input.component.html',
  styleUrl: './calendar-input.component.css',
})
export class CalendarInputComponent {
  protected eventForm: FormGroup;

  constructor(
    private fireStoreService: FirestoreService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.eventForm = this.fb.group({
      title: new FormControl<string>(''),
      eventStart: new FormControl<string>(''),
      eventEnd: new FormControl<string>(''),
      repeat: new FormControl<boolean>(false),
      duration: new FormControl<string>(''),
      until: new FormControl<string>(''),
      frequency: new FormControl<string>(''),
      interval: new FormControl<number>(0),
      backgroundColor: new FormControl<string>(''),
      textColor: new FormControl<string>(''),
      weekDay: new FormControl<string>(''),
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      if (this.eventForm.value.repeat) {
        const formValues = this.eventForm.value;
        this.fireStoreService
          .addRepeatItem(formValues)
          .then((docRef: any) => {
            console.log('Document successfully written!', docRef.id);
            this.eventForm.reset();
          })
          .catch((error: any) => {
            console.error('Error writing document: ', error);
          });
      } else {
        const formValues = this.eventForm.value;
        this.fireStoreService
          .addItem(formValues)
          .then((docRef: any) => {
            console.log('Document successfully written!', docRef.id);
            this.eventForm.reset();
          })
          .catch((error: any) => {
            console.error('Error writing document: ', error);
          });
      }
    }
  }

  onClearForm() {
    this.eventForm.reset();
  }

  logOut() {
    this.authService.logout();
  }
}
