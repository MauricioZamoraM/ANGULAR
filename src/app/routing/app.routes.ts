import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('../modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../modules/main/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'reportarPago',
    loadComponent: () =>
      import('../modules/reportar-pago/pages/reportar-pago.component').then(
        (m) => m.ReportarPagoComponent
      ),
  },
];
