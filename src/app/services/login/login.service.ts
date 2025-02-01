import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import API from '@environments/environment.apis';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(credentials: { usuario: string ; clave: string; sistema: string; active_directory: boolean;   }): Observable<any> {
    return this.http.post(API.Auth.login, credentials);
  }

  // Método para cerrar sesión
  logout(): Observable<any> {
    return this.http.post(API.Auth.logout, {});
  }

  // Método para obtener un token (si es necesario)
  getToken(): Observable<any> {
    return this.http.get(API.Auth.getToken);
  }

  // Método para validar un token (si es necesario)
  checkToken(token: string): Observable<any> {
    return this.http.post(API.Auth.checkToken, { token });
  }
}
