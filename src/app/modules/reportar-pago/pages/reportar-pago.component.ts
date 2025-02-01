import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportar-pago',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reportar-pago.component.html',
  styleUrls: ['./reportar-pago.component.css']
})
export class ReportarPagoComponent {
  formData = {
    identificationType: '',
    identification: '',
    operation: '',
    referenceNumber: '',
    paymentDate: '',
    amountPaid: null as number | null
  };

  isFormDisabled = false; // Estado para bloquear los campos después del envío

  constructor(private http: HttpClient) {}

  // Método para el envío de datos
  onSubmit() {
    if (this.isFormDisabled) return; // Evita que se reenvíe si ya está deshabilitado

    const apiUrl = 'http://localhost:5154/ReportePagos/MC';

    const requestBody = {
      IDPais: 1,
      IDCredito: this.formData.operation || 'SIN_ID',
      MontoPago: (this.formData.amountPaid ?? 0).toFixed(2),
      FechaPago: this.formData.paymentDate
        ? new Date(this.formData.paymentDate).toLocaleDateString('es-ES')
        : '01/01/2024',
      LugarDeposito: "INSTACREDIT",
      PuntoPago: "PRUEBA A3C",
      NoComprobante: this.formData.referenceNumber || 'SIN_COMPROBANTE'
    };

    this.http.post(apiUrl, requestBody).subscribe({
      next: () => {
        alert('✅ Pago reportado correctamente');

        // 🔄 Limpia los campos después del envío
        this.formData = {
          identificationType: '',
          identification: '',
          operation: '',
          referenceNumber: '',
          paymentDate: '',
          amountPaid: null
        };

        // 🔒 Deshabilita el formulario para evitar reenvíos
        this.isFormDisabled = true;
      },
      error: (error) => {
        console.error('❌ Error al reportar pago:', error);
        alert('Error al reportar el pago. Intente de nuevo.');
      }
    });
  }

  // Método para ejecutar la API al hacer focusout en el campo de identificación
  onIdentificationFocusOut() {
    const cedula = this.formData.identification;

    if (!cedula) {
      console.error('La cédula no está definida');
      return;
    }

    const apiUrl = 'http://localhost:5154/ReportePagos/Pagos';
    const requestBody = {
      pais: 1,
      cedula: cedula
    };

    this.http.post(apiUrl, requestBody).subscribe({
      next: (response: any) => {
        console.log('Respuesta de la API:', response);
        // Aquí puedes manejar la respuesta si lo deseas (como mostrar un mensaje o actualizar el formulario)
      },
      error: (error) => {
        console.error('❌ Error al consultar la cédula:', error);
      }
    });
  }
}
