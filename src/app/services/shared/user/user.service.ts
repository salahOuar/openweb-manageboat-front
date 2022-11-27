import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from '../storage/storage.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/shared/user/user.model';



const URL_API = `${environment.apiUrl}`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService

  ) { }

  private logged = new ReplaySubject<boolean>(1);
  public isLogged = this.logged.asObservable();

  account(): Observable<any> {
    return this.http.get<User>(
      URL_API + '/account',
      httpOptions
    ).pipe(map(response => this.authenticateSuccess(response)));
  }

  logout(): Observable<any> {
    return this.http.post(
      URL_API + '/logout',
      httpOptions
    ).pipe(map(() => this.logoutSuccess()));
  }
  /**
   * 
   * @param user 
   */
  private authenticateSuccess(user: User): void {
    this.storageService.saveUser(user);
    this.logged.next(true);
  }

  /**
   * 
   * @param user 
   */
  private logoutSuccess(): void {
    this.storageService.clean();
    this.logged.next(false);
  }
}