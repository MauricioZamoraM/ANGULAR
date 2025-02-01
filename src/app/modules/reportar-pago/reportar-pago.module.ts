import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { RouterModule } from '@angular/router';
import { ReportarPagoComponent } from './pages/reportar-pago.component';
import { SharedModule } from "../../sharedComponents/shared.module";

@NgModule({
  declarations: [ReportarPagoComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule, // Asegúrate de importar HttpClientModule aquí
    RouterModule.forChild([
        {
            path: '',
            component: ReportarPagoComponent,
        },
    ]),
    SharedModule
],
  
})

export class LoginModule {}
