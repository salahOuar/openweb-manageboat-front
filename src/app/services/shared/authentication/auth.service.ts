import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/shared/login/login.model';
import { environment } from 'src/environments/environment';


const URL_API = `${environment.apiUrl}/`;



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
type JwtToken = {
  id_token: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient

  ) { }

  /**
   * 
   * @param credentials 
   * @returns 
   */
  login(credentials: Login): Observable<any> {
    return this.http.post<JwtToken>(
      URL_API + 'authenticate',
      credentials,
      httpOptions
    );
  }
}