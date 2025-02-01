import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,  // Asegúrate de agregar esto
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  rutaImagen: string = 'assets/images/logo.jpg';
}
