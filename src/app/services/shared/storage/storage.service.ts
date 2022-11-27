import { Injectable } from '@angular/core';
import { Constants } from 'src/app/utils/constants';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(

  ) { }
  /**
   * 
   */
  clean(): void {
    localStorage.clear();
  }
  /**
   * 
   * @param user 
   */
  public saveUser(user: any): void {
    localStorage.removeItem(Constants.USER_KEY);
    localStorage.setItem(Constants.USER_KEY, JSON.stringify(user));
  }
  /**
   * 
   * @returns 
   */
  public getUser(): any {
    const user = localStorage.getItem(Constants.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  /**
   * 
   * @returns 
   */
  public isLoggedIn(): boolean {
    const user = localStorage.getItem(Constants.USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}