import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']  // Corrección aquí: usar styleUrls en plural
})
export class AppComponent {
  title = 'FORMULARIO_REPORTE_PAGOS';

  showAlert() {
    Swal.fire({
      title: '¡Hola!',
      text: 'Esto es una prueba de SweetAlert2 en Angular 18',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }
}
