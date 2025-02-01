import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from "../../sharedComponents/shared.module";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule, // Asegúrate de importar HttpClientModule aquí
    RouterModule.forChild([
        {
            path: '',
            component: LoginComponent,
        },
    ]),
    SharedModule
],
  
})
export class LoginModule {}
