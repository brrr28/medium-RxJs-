import {Component, Input, OnInit} from '@angular/core';
import {BackendErrorsInterface} from '../types/backendErrors.interface';

@Component({
  selector: 'app-backend-errors',
  templateUrl: './backend-errors.component.html',
  styleUrls: ['./backend-errors.component.scss'],
})
export class BackendErrorsComponent implements OnInit {
  @Input('backErrors') BackendErrorProps: BackendErrorsInterface;

  errorMessages: string[];

  constructor() {}

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.BackendErrorProps).map(
      (name: string) => {
        const messages = this.BackendErrorProps[name].join(', ');
        return `${name} ${messages}`;
      }
    );
  }
}
