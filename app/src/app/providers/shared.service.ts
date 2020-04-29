
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  private message = new BehaviorSubject('First Message');
  sharedMessage = this.message.asObservable();

  constructor() { }

  nextMessage(message: string) {
    this.message.next(message)
  }
  
}