import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reportar-pago',
  standalone: true,
  imports: [],
  templateUrl: './reportar-pago.component.html',
  styleUrl: './reportar-pago.component.css'
})
export class ReportarPagoComponent {
  formData = {
    identificationType: '',
    identification: '',
    operation: '',
    referenceNumber: '',
    paymentDate: '',
    amountPaid: ''
  };

  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Por favor, complete todos los campos antes de continuar.');
      return;
    }
    console.log('Formulario enviado:', this.formData);
    alert('Formulario enviado con éxito.');
  }
}
