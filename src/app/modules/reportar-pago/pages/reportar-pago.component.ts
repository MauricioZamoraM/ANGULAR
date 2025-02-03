import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportar-pago',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  operations: string[] = []; // Arreglo para los valores de operación

  isFormDisabled = false; // Estado para bloquear los campos después del envío
  documentMasks: { [key: string]: string } = {}; // Almacena las máscaras
  documentMaskKeys: string[] = [];
  currentMask: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchDocumentMasks();
  }

  // Obtener las máscaras desde la API
  fetchDocumentMasks() {
    const apiUrl = 'http://localhost:5154/ReportePagos/TiposDocumento';
    const requestBody = { Cedula: '', pais: 1 };

    this.http.post(apiUrl, requestBody).subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          response.data.forEach((doc: any) => {
            this.documentMasks[doc.nombre] = doc.mascara;
          });

          this.documentMaskKeys = Object.keys(this.documentMasks);
        }
      },
      error: (error) => {
        console.error('❌ Error al obtener las máscaras:', error);
      }
    });
  }

  // Método para actualizar la máscara cuando cambie el tipo de identificación
  updateMask() {
    const selectedType = this.formData.identificationType;
    this.currentMask = this.documentMasks[selectedType] || '';
    this.formData.identification = ''; // Reinicia el campo al cambiar de tipo
  }

  // Aplicar la máscara en tiempo real
  applyMask() {
    if (!this.currentMask) return;
  
    let rawValue = this.formData.identification.replace(/\D/g, ''); // Solo números
    let maskedValue = '';
    let rawIndex = 0;
  
    // Validación adicional para permitir solo caracteres según la máscara
    const maskPattern = this.currentMask.split('');
    for (let i = 0; i < maskPattern.length; i++) {
      if (maskPattern[i] === '#') {
        if (rawIndex < rawValue.length) {
          maskedValue += rawValue[rawIndex++];
        } else {
          break;
        }
      } else {
        maskedValue += maskPattern[i];
      }
    }
  
    // Cortamos si el usuario intenta escribir más números de los permitidos
    if (rawValue.length > this.getMaxLength()) {
      rawValue = rawValue.substring(0, this.getMaxLength());
    }
  
    // Actualiza el valor con la máscara aplicada
    this.formData.identification = maskedValue;
  }
  

  // Método para evitar que el usuario ingrese letras
onlyNumbers(event: KeyboardEvent) {
  const regex = /^[0-9]$/;
  const key = event.key;

  if (!regex.test(key)) {
    event.preventDefault(); // Evita la entrada de caracteres no numéricos
  }
}


  getMaxLength(): number {
    // Revisamos si this.currentMask tiene un valor válido
    if (!this.currentMask) {
      return 0; 
    }

    // Contamos tanto los caracteres '#' como los '-'
    const maxLength = (this.currentMask.match(/[#-]/g) || []).length;

    return maxLength;
  }



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
        alert('Pago reportado correctamente');

        // 🔄 Limpia los campos después del envío
        this.formData = {
          identificationType: '',
          identification: '',
          operation: '',
          referenceNumber: '',
          paymentDate: '',
          amountPaid: null
        };

        // Deshabilita el formulario para evitar reenvíos
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
    const cedula = this.formData.identification.replace(/-/g, '');

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

        // Si la respuesta es exitosa, actualizamos el campo de monto pagado con el valor_obligacion
        if (response.success && response.data && response.data.length > 0) {
          this.formData.amountPaid = response.data[0].valor_obligacion; // Asignamos el valor de la obligación

          // Llenamos el arreglo de operaciones con el formato "comprobante-numero"
          this.operations = response.data.map((item: { comprobante: string, numero: number }) => `${item.comprobante}-${item.numero}`);

          // Si solo hay un valor, lo asignamos directamente al campo de operación
          if (this.operations.length === 1) {
            this.formData.operation = this.operations[0];
          }
        } else {
          console.error('No se encontró valor de obligación');
        }
      },
      error: (error) => {
        console.error('❌ Error al consultar la cédula:', error);
      }
    });
  }
}
