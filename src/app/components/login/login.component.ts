import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/shared/authentication/auth.service';
import { UserService } from 'src/app/services/shared/user/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get formControls() { return this.form?.controls; }

  onSubmit() {
    this.submitted = true;



    if (this.form?.invalid) {
      return;
    }

    this.loading = true;
    const username = this.formControls?.['username']?.value;
    const password = this.formControls?.['password']?.value;

    this.authService.login({ username, password })
      .subscribe({
        next: () => this.fetchAccount(),
        error: () => {
          this.loading = false;
        }
      });

  }
  /**
   * 
   * @returns 
   */
  private fetchAccount() {
    return this.userService.account().subscribe({
      next: () => this.router.navigate([this.returnUrl]),
      error: () => {
      }
    });
  }

  /**
 * 
 * @param filedName 
 */
  diplayError(filedName: string) {
    return this.submitted && this.form.get(filedName)?.hasError('required') ? 'is-invalid' : '';
  }
}