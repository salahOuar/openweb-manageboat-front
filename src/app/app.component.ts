import { Component } from '@angular/core';

import { StorageService } from './services/shared/storage/storage.service';
import { UserService } from './services/shared/user/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'boat-html';
  isLoggedIn = false;
  firstName?: string;
  lastName?: string;
  email?: string;
  constructor(private storageService: StorageService, private userService: UserService) { }
  ngOnInit(): void {
    this.userService.isLogged.subscribe(logged => {
      this.isLoggedIn = logged;
      const user = this.storageService.getUser();
      if (user && user.authorities) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
      }

    });
    const user = this.storageService.getUser();
    if (user && user.authorities) {
      this.isLoggedIn = true;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
    }
  }
  /**
   * 
   */
  logout(): void {
    this.userService.logout()
      .subscribe({
        next: () => this.clean(),
      });
  }

  clean(): void {
    this.storageService.clean();
    window.location.reload();
  }

}
