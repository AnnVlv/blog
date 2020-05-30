import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';
import {IAlert} from '../../interfaces/alert';
import {timer} from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() public delay: number = 3000;
  public message: string;
  public type: string = 'success';

  constructor(private alertService: AlertService) {
  }

  public ngOnInit(): void {
    this.alertService.alert$.subscribe((alert: IAlert) => {
      this.type = alert.type;
      this.message = alert.message;

      const timer$ = timer(this.delay);
      timer$.subscribe(() => {
        this.message = '';
      });
    });
  }
}
