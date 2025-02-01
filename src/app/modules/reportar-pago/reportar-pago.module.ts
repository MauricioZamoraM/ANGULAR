import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReportarPagoComponent } from './pages/reportar-pago.component'; // ✅ Import normal
import { SharedModule } from "../../sharedComponents/shared.module";

@NgModule({
  imports: [
    CommonModule,
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
export class ReportarPagoModule {}
