// src/app/firestore.service.ts
import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  DocumentReference,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  addItem(item: any): Promise<DocumentReference<any>> {
    const collectionInstance = collection(this.firestore, 'events');
    return addDoc(collectionInstance, {
      title: item.title,
      start: item.eventStart,
      end: item.eventEnd,
      backgroundColor: item.backgroundColor,
      textColor: item.textColor,
    });
  }

  addRepeatItem(item: any): Promise<DocumentReference<any>> {
    const collectionInstance = collection(this.firestore, 'events');
    return addDoc(collectionInstance, {
      title: item.title,
      start: item.eventStart,
      end: item.eventEnd,
      duration: item.duration + ':00',
      backgroundColor: item.backgroundColor,
      textColor: item.textColor,
      rrule: {
        dtstart: item.eventStart,
        freq: item.frequency || 'daily',
        interval: item.interval,
        byweekday: item.weekDay,
        until: item.until,
      },
    });
  }

  getItems(): Observable<any[]> {
    const itemsCollection = collection(this.firestore, 'events');
    return collectionData(itemsCollection, { idField: 'id' }) as Observable<
      any[]
    >;
  }

  deleteData(id: string) {
    const docRef = doc(this.firestore, `events/${id}`);
    deleteDoc(docRef)
      .then(() => console.log('Document successfully deleted'))
      .catch((error) => console.error('Error deleting document:', error));
  }
}
