import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private class = new Subject<any>();
  class$ = this.class.asObservable();
  private user = new Subject<any>();
  user$ = this.user.asObservable();

  changeClass(value: any) {
    console.log("Class: ",value)
    this.class.next(value);
  }

  changeUser(value: any) {
    console.log("user: ",value)
    this.user.next(value);
  }
}
