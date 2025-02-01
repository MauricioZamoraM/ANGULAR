import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'reportarPago',
    pathMatch: 'full',
  },
  {
    path: 'reportarPago',
    loadComponent: () =>
      import('../modules/reportar-pago/pages/reportar-pago.component').then(
        (m) => m.ReportarPagoComponent
      ),
  },
];
