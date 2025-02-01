import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-button',
  templateUrl: './confirm-button.component.html',
  styleUrls: ['./confirm-button.component.css']
})
export class ConfirmButtonComponent {
  @Input() buttonText: string = 'Confirm';
  @Input() isDisabled: boolean = false;
  @Output() confirmEvent = new EventEmitter<void>();

  confirm(): void {
    if (confirm('Are you sure you want to proceed?')) {
      this.confirmEvent.emit();
    }
  }
}
