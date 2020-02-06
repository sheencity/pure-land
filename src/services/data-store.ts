import { Subject } from 'rxjs';
export class DataStore {
  static infoEmitter = new Subject();
  static infoShowEmitter = new Subject<boolean>();
  static menuClickEmitter = new Subject<string>();
}
