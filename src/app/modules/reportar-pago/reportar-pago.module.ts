import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReportarPagoComponent } from './pages/reportar-pago.component';
import { SharedModule } from "../../sharedComponents/shared.module";

@NgModule({
  declarations: [ReportarPagoComponent],
  imports: [
    CommonModule, // ✅ Asegura que esto esté aquí
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
        {
            path: '',
            component: ReportarPagoComponent, 
        },
    ]),
    SharedModule
  ],
})
export class ReportarPagoModule { }
