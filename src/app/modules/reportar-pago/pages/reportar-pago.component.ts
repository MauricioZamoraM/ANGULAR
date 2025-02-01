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
    amountPaid: null
  };

  constructor(private http: HttpClient) {} // ✅ Inyecta HttpClient

  onSubmit() {
    const apiUrl = 'http://localhost:5154/ReportePagos/MC';

    // 🔹 Construir el objeto de la petición según el formato esperado por la API
    const requestBody = {
      IDPais: 1,
      IDCredito: this.formData.operation, // 🔄 Se usa el valor de "Operación"
      MontoPago: (this.formData.amountPaid ?? 0).toFixed(2), // 🔄 Formato de dos decimales
      FechaPago: new Date(this.formData.paymentDate).toLocaleDateString('es-ES'), // 🔄 Formato "dd/MM/yyyy"
      LugarDeposito: "INSTACREDIT", // 🔄 Se mantiene fijo
      PuntoPago: "PRUEBA A3C", // 🔄 Se mantiene fijo
      NoComprobante: this.formData.referenceNumber // 🔄 Número de referencia
    };

    // 🔹 Enviar la petición POST con HttpClient
    this.http.post(apiUrl, requestBody).subscribe({
      next: (response) => {
        console.log('✅ Pago reportado con éxito:', response);
        alert('Pago reportado correctamente');
      },
      error: (error) => {
        console.error('❌ Error al reportar pago:', error);
        alert('Error al reportar el pago');
      }
    });
  }
}
