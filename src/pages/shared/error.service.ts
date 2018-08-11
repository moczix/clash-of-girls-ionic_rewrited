import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs/Rx";


@Injectable()
export class ErrorService {
  message = new Subject<string>();

  setMessage(message: string) {
    this.message.next(message);
  }

  getMessage(): Observable<string> {
    return this.message.asObservable();
  }

}
