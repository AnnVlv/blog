import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {IAlert, IAlertType} from '../interfaces/alert';

@Injectable()
export class AlertService {
  public alert$: Subject<IAlert> = new Subject<IAlert>();

  public callNext(type: IAlertType, message: string): void {
    this.alert$.next({type, message});
  }
}
