import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent {
  @Input() selectedDate: string = '';
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Output() selectedDateChange = new EventEmitter<string>();

  onDateChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.selectedDateChange.emit(inputElement.value);
  }
}
