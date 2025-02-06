import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


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
    referenceNumber: null,
    paymentDate: '',
    amountPaid: null
  };

  operations: string[] = []; 

  isFormDisabled = false; 
  documentMasks: { [key: string]: string } = {}; 
  documentMaskKeys: string[] = [];
  currentMask: string = '';
  currentMaskPa: string = '';

  identificationError: string | null = null;
  referenciaError: string | null = null;
  fechaPagoError: string | null = null;
  montoPagadoError: string | null = null;
  operacionError: string | null = null;
  identificationTypeError: string | null = null;

  today: string = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
    .split('/').reverse().join('-');

  pais: number = 1;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchDocumentMasks();
  }

  // Obtener las máscaras desde la API
  fetchDocumentMasks() {
    const apiUrl = 'http://localhost:5154/ReportePagos/TiposDocumento';
    const requestBody = { Cedula: '', pais: this.pais };

    this.http.post(apiUrl, requestBody).subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          response.data.forEach((doc: any) => {
            this.documentMasks[doc.nombre] = doc.mascara;
          });

          this.documentMaskKeys = Object.keys(this.documentMasks);

          // Si hay valores en el combo, seleccionar el primero por defecto
          if (this.documentMaskKeys.length > 0) {
            this.formData.identificationType = this.documentMaskKeys[0];
            this.updateMask(); // Aplicar la máscara correspondiente
          }

        }
      },
      error: (error) => {
        console.error('❌ Error al obtener las máscaras:', error);
      }
    });
  }

  // Método para actualizar la máscara cuando cambie el tipo de identificación
  updateMask() {
    if (this.pais != 3) {
      const selectedType = this.formData.identificationType;
      this.currentMask = this.documentMasks[selectedType] || '';
      this.formData.identification = ''; 
    } else {
      const selectedType = this.formData.identificationType;
      this.currentMask = this.documentMasks[selectedType] || ''; 
      this.currentMaskPa = this.documentMasks[selectedType] || '';
      this.formData.identification = ''; 
    }
  }

  applyMask() {
    if (this.pais != 3) {
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

      if (rawValue.length > this.getMaxLength()) {
        rawValue = rawValue.substring(0, this.getMaxLength());
      }

      this.formData.identification = maskedValue;
    } else {
      switch (this.currentMask) {
        case "E-####-######":  
          let rawValue = this.formData.identification.replace(/\D/g, '');
          let maskedValue = 'E-'; 
          let rawIndex = 0;

          const maskPattern = this.currentMask.split('');

          // Aplica la máscara
          for (let i = 2; i < maskPattern.length; i++) { 
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

          if (rawValue.length > this.getMaxLength()) {
            rawValue = rawValue.substring(0, this.getMaxLength());
          }

          this.formData.identification = maskedValue;
          break;

        case "AAAAAAAAAAAAAAA": 
          let rawAlphaNumericValue = this.formData.identification.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
          let maxLength = 15; 

          if (rawAlphaNumericValue.length > maxLength) {
            rawAlphaNumericValue = rawAlphaNumericValue.substring(0, maxLength);
          }

          this.formData.identification = rawAlphaNumericValue;
          break;

        case "#-####-#####,PE-####-#####,1AV-####-#####,1PI-####-#####": 
          let rawVal = this.formData.identification.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

          let maskedVal = '';
          let rawInde = 0;

          if (rawVal.length > 0) {
            const firstChar = rawVal[0].toUpperCase();

            if (firstChar === 'P') {
              let maxLength = 13;  
              maskedVal = 'PE-';
              rawInde = 2; 

              if (rawVal.length > 1) {
                for (let i = 0; i < 4; i++) {
                  if (rawInde < rawVal.length) {
                    maskedVal += rawVal[rawInde++];
                  } else {
                    break;
                  }
                }
                maskedVal += '-'; 
                for (let i = 0; i < 5; i++) {
                  if (rawInde < rawVal.length) {
                    maskedVal += rawVal[rawInde++]; 
                  } else {
                    break;
                  }
                }

              } else {
                maskedVal = 'PE';
              }

              if (maskedVal.length > maxLength) {
                maskedVal = maskedVal.substring(0, maxLength);
              }
              this.currentMaskPa = 'PE-####-#####';

            } else if (firstChar === '1' && rawVal[1] === 'A') {
              let maxLength = 14;  
              maskedVal = '1AV-';
              rawInde = 3; 

              if (rawVal.length > 2) {
                for (let i = 0; i < 4; i++) {
                  if (rawInde < rawVal.length) {
                    maskedVal += rawVal[rawInde++]; 
                  } else {
                    break;
                  }
                }
                maskedVal += '-'; 
                for (let i = 0; i < 5; i++) {
                  if (rawInde < rawVal.length) {
                    maskedVal += rawVal[rawInde++]; 
                  } else {
                    break;
                  }
                }
              } else {
                maskedVal = '1AV';
              }

              if (maskedVal.length > maxLength) {
                maskedVal = maskedVal.substring(0, maxLength);
              }
              this.currentMaskPa = '1AV-####-#####';

            } else if (firstChar === '1' && rawVal[1] === 'P') {
              let maxLength = 14;  
              maskedVal = '1PI-';
              rawInde = 3; 

              if (rawVal.length > 2) {
                for (let i = 0; i < 4; i++) {
                  if (rawInde < rawVal.length) {
                    maskedVal += rawVal[rawInde++]; 
                  } else {
                    break;
                  }
                }
                maskedVal += '-'; 
                for (let i = 0; i < 5; i++) {
                  if (rawInde < rawVal.length) {
                    maskedVal += rawVal[rawInde++]; 
                  } else {
                    break;
                  }
                }
              } else {
                maskedVal = '1PI';
              }

              if (maskedVal.length > maxLength) {
                maskedVal = maskedVal.substring(0, maxLength);
              }
              this.currentMaskPa = '1PI-####-#####';
            } else if (!isNaN(Number(firstChar))) {
              let maxLength = 12; 
              maskedVal = firstChar + '-';
              rawInde = 1; 

              for (let i = 0; i < 4; i++) {
                if (rawInde < rawVal.length) {
                  maskedVal += rawVal[rawInde++]; 
                } else {
                  break;
                }
              }
              maskedVal += '-';
              for (let i = 0; i < 5; i++) {
                if (rawInde < rawVal.length) {
                  maskedVal += rawVal[rawInde++]; 
                } else {
                  break;
                }
              }

              if (maskedVal.length > maxLength) {
                maskedVal = maskedVal.substring(0, maxLength);
              }
              this.currentMaskPa = '#-####-#####';
            }
          }

          this.formData.identification = maskedVal;
          break;

      }
    }

  }

  // Método para validar la identificación según la máscara
  validateIdentification() {
    if (this.pais !== 3) {
      if (!this.formData.identification) {
        this.identificationError = 'Campo requerido';
        return false;
      }

      const selectedType = this.formData.identificationType;
      const validMask = this.documentMasks[selectedType];

      if (!validMask) {
        this.identificationError = 'Tipo de documento no válido';
        return false;
      }

      if (validMask.length !== this.formData.identification.length) {
        this.identificationError = 'Verifique que el número de identificación ingresado sea el correcto o que el tipo de documento sea el adecuado.';
        return false;
      }

      this.identificationError = null;
      return true;
    } else {
      if (!this.formData.identification || this.formData.identification === "E-") {
        this.identificationError = 'Campo requerido';
        return false;
      }

      const selectedType = this.formData.identificationType;
      const validMask = this.documentMasks[selectedType];

      if (!validMask) {
        this.identificationError = 'Tipo de documento no válido';
        return false;
      }

      const inputId = this.formData.identification;

      switch (this.currentMaskPa) {
        case "E-####-######": 
          if (!/^E-\d{4}-\d{6}$/.test(inputId)) {
            this.identificationError = 'El formato debe ser "E-####-######"';
            return false;
          }
          break;

        case "#-####-#####": 
          if (!/^\d-\d{4}-\d{5}$/.test(inputId)) {
            this.identificationError = 'El formato debe ser "#-####-#####"';
            return false;
          }
          break;

        case "PE-####-#####": 
          if (!/^PE-\d{4}-\d{5}$/.test(inputId)) {
            this.identificationError = 'El formato debe ser "PE-####-#####"';
            return false;
          }
          break;

        case "1AV-####-#####": 
          if (!/^1AV-\d{4}-\d{5}$/.test(inputId)) {
            this.identificationError = 'El formato debe ser "1AV-####-#####"';
            return false;
          }
          break;

        case "1PI-####-#####": 
          if (!/^1PI-\d{4}-\d{5}$/.test(inputId)) {
            this.identificationError = 'El formato debe ser "1PI-####-#####"';
            return false;
          }
          break;

        case "AAAAAAAAAAAAAAA": 
          if (!/^[A-Za-z0-9]{15}$/.test(inputId)) {
            this.identificationError = 'El pasaporte debe tener exactamente 15 caracteres alfanuméricos.';
            return false;
          }
          break;

        default:
          this.identificationError = 'Formato no reconocido.';
          return false;
      }

      this.identificationError = null;
      return true;
    }
  }

  getMaxLength(): number {
    if (this.pais != 3) {
      if (!this.currentMask) {
        return 0;
      }

      // Contamos los caracteres '#' y '-' en la máscara
      return (this.currentMask.match(/[#-]/g) || []).length;
    } else {
      if (!this.currentMaskPa) {
        return 0;
      }

      switch (this.currentMaskPa) {
        case "E-####-######":
          return 13;
        case "PE-####-#####":
          return 13;
        case "AAAAAAAAAAAAAAA":
          return 15;
        case "1AV-####-#####":
          return 14;
        case "1PI-####-#####":
          return 14;
        case "#-####-#####":
          return 12;
        default: return 50;
      }
    }
  }



  validateReferenceNumber() {
    if (!this.formData.referenceNumber) {
      this.referenciaError = 'Campo requerido';
    } else {
      this.referenciaError = null;
    }
  }

  validateOperation() {
    if (!this.formData.operation) {
      this.operacionError = 'Campo requerido';
    } else {
      this.operacionError = null;
    }
  }

  validatePaymentDate() {
    if (!this.formData.paymentDate) {
      this.fechaPagoError = 'Campo requerido';
      return;
    }

    const selectedDate = new Date(this.formData.paymentDate);
    const todayDate = new Date(this.today);

    if (selectedDate > todayDate) {
      this.fechaPagoError = 'Estimado usuario, favor indicar únicamente fechas igual o inferiores a hoy.';
    } else {
      this.fechaPagoError = null;
    }
  }


  validateAmountPaid() {
    if (!this.formData.amountPaid) {
      this.montoPagadoError = 'Campo requerido';
    } else {
      this.montoPagadoError = null;
    }
  }

  validateForm() {
    let isValid = true;

    // Reiniciar mensajes de error
    this.identificationTypeError = '';
    this.operacionError = '';
    this.referenciaError = '';
    this.fechaPagoError = '';
    this.montoPagadoError = '';

    // Validar Tipo Identificación
    if (!this.formData.identificationType) {
      this.identificationTypeError = 'Campo requerido';
      isValid = false;
    }
    if (this.pais !== 3) {
      // Validar Identificación
      if (!this.formData.identification && !this.identificationError) {
        this.identificationError = 'Campo requerido';
        isValid = false;
      }
    } else {
      if ((!this.formData.identification || this.formData.identification === "E-") && !this.identificationError) {
        this.identificationError = 'Campo requerido';
        isValid = false;
      }
    }

    // Validar Operación
    if (!this.formData.operation) {
      this.operacionError = 'Campo requerido';
      isValid = false;
    }

    // Validar Número de Referencia
    if (!this.formData.referenceNumber) {
      this.referenciaError = 'Campo requerido';
      isValid = false;
    }

    // Validar Fecha de Pago
    if (!this.formData.paymentDate) {
      this.fechaPagoError = 'Campo requerido';
      isValid = false;
    } else {
      // Llamar a la función de validación de fecha que ya tienes
      this.validatePaymentDate();
      if (this.fechaPagoError) {
        isValid = false;
      }
    }

    // Validar Monto Pagado
    if (!this.formData.amountPaid) {
      this.montoPagadoError = 'Campo requerido';
      isValid = false;
    }

    return isValid;
  }

  // Método para evitar que el usuario ingrese letras
  onlyNumbers(event: KeyboardEvent) {
    if (this.pais !== 3) {
      const regex = /^[0-9]$/;
      const key = event.key;

      if (!regex.test(key)) {
        event.preventDefault(); 
      }
    }
  }

  // Método para ejecutar la API al hacer focusout en el campo de identificación
  onIdentificationFocusOut() {
    const cedula = this.formData.identification.replace(/-/g, '');

    if (this.validateIdentification()) {
      const apiUrl = 'http://localhost:5154/ReportePagos/Pagos';
      const requestBody = {
        pais: this.pais,
        cedula: cedula
      };

      this.http.post(apiUrl, requestBody).subscribe({
        next: (response: any) => {
          console.log('Respuesta de la API:', response);

          if (response.success && response.data && response.data.length > 0) {

            this.operations = response.data.map((item: { comprobante: string, numero: number }) => `${item.comprobante}-${item.numero}`);

            if (this.operations.length === 1) {
              this.formData.operation = this.operations[0];
            }
          } else {
            Swal.fire({
              title: 'Informativo',
              text: 'El número de identificación ingresado no posee créditos activos.',
              icon: 'info'
            }).then((result) => {
              if (result.isConfirmed) {
                this.formData.amountPaid = null;
                this.formData.operation = '';
                this.operations = [];
                this.formData.referenceNumber = null;
                this.formData.paymentDate = '';
              }
            });
          }
          this.validateOperation();
        },
        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'Se presentó un inconveniente al consultar la cédula, por favor intentelo más tarde.',
            icon: 'error',
          })
        }
      });
    }

  }


  // Método para el envío de datos
  onSubmit() {
    if (this.isFormDisabled) return; 

    if (!this.validateForm()) {
      Swal.fire({
        title: 'Informativo',
        text: 'Complete todos los campos antes de enviar el formulario.',
        icon: 'info'
      });
    } else {
      const apiUrl = 'http://localhost:5154/ReportePagos/MC';

      const requestBody = {
        IDPais: this.pais,
        IDCredito: this.formData.operation,
        MontoPago: (this.formData.amountPaid ?? 0).toFixed(2),
        FechaPago: this.formData.paymentDate
          ? new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })
            .format(new Date(this.formData.paymentDate + 'T00:00:00'))
          : null,
        NoComprobante: this.formData.referenceNumber
      };

      this.http.post(apiUrl, requestBody).subscribe({
        next: () => {
          Swal.fire({
            title: 'Éxito',
            text: 'Pago reportado correctamente.',
            icon: 'success',
          }).then((result) => {
            if (result.isConfirmed) {
              this.formData = {
                identificationType: '',
                identification: '',
                operation: '',
                referenceNumber: null,
                paymentDate: '',
                amountPaid: null
              };

              this.isFormDisabled = true;
            }
          });
        },

        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'Se presentó un inconveniente al reportar el pago, por favor intentelo más tarde.',
            icon: 'error',
          }).then((result) => {
            if (result.isConfirmed) {
              this.formData = {
                identificationType: '',
                identification: '',
                operation: '',
                referenceNumber: null,
                paymentDate: '',
                amountPaid: null
              };
              this.isFormDisabled = true;
            }
          });
        }
      });
    }
  }


}
