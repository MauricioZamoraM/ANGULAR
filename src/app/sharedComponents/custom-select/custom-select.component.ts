import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css']
})
export class CustomSelectComponent {
  @Input() options: { value: string | number, label: string }[] = [];
  @Input() selectedValue: string | number | null = null;
  @Output() selectedValueChange = new EventEmitter<string | number>();

  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedValueChange.emit(selectElement.value);
  }
}
