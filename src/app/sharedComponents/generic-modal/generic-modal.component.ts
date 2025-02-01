import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generic-modal',
  templateUrl: './generic-modal.component.html',
  styleUrls: ['./generic-modal.component.css']
})
export class GenericModalComponent {
  @Input() title: string = 'Modal Title';
  @Input() isOpen: boolean = false;
  @Input() confirmText?: string;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() confirmEvent = new EventEmitter<void>();

  close(): void {
    this.isOpen = false;
    this.closeEvent.emit();
  }

  confirm(): void {
    this.confirmEvent.emit();
    this.close();
  }
}


//En el componente que utiliza <app-generic-modal>, define los métodos handleClose y handleConfirm, así como la variable isModalOpen


// isModalOpen: boolean = false;

// openModal() {
//   this.isModalOpen = true;
// }

// handleClose() {
//   this.isModalOpen = false;
//   console.log('Modal cerrado');
// }

// handleConfirm() {
//   console.log('Acción de confirmación');
//   this.isModalOpen = false;
// }
