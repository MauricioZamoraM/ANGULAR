import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportarPagoComponent } from './pages/reportar-pago.component';

const routes: Routes = [
  {
    path: '',
    component: ReportarPagoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
