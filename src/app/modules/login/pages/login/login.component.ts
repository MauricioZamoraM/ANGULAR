import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  usuario: string = '';
  clave: string = '';
  sistema: string = 'Portal';
  active_directory: boolean = true;
  errorMessage: string | null = null;
  showNotification: boolean = false;
  message: string = '';
  tipo: string = 'info'; // Tipo inicial como string, puede cambiar según las necesidades.

  // Castea el valor de tipo a lo que espera el componente de notificación.
  get castedTipo(): 'success' | 'danger' | 'warning' | 'info' {
    return this.tipo as 'success' | 'danger' | 'warning' | 'info';
  }

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    const credentials = { 
      usuario: this.usuario, 
      clave: this.clave, 
      sistema: this.sistema, 
      active_directory: this.active_directory 
    };

    this.loginService.login(credentials).subscribe({
      next: (response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.displayNotification('Login correcto, bienvenido.', 'success');

          setTimeout(() => {
            this.router.navigate(['/dashboard']);
            this.resetNotification();
          }, 1000);
        } else {
          this.displayNotification('Credenciales incorrectas. Por favor, intenta de nuevo.', 'danger');
        }
      },
      error: (error) => {
        this.displayNotification('Ocurrió un error en el login. Por favor, intenta de nuevo.', 'danger');
        console.error('Error de login:', error);
      }
    });
  }

  displayNotification(message: string, type: 'success' | 'danger' | 'warning' | 'info') {
    this.message = message;
    this.tipo = type; // Asigna el tipo recibido a la variable.
    this.showNotification = true;

    setTimeout(() => {
      this.resetNotification();
    }, 5000);
  }

  resetNotification() {
    this.showNotification = false;
    this.message = '';
  }
}
