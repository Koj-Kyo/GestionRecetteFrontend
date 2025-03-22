import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { AuthService } from '../services/auth.service';
  import { tap } from 'rxjs/operators';

  @Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent {
    loginFormGroup: FormGroup;
    errorMessage: string = '';

    constructor(private fb: FormBuilder, private authService: AuthService) {
      this.loginFormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    onSubmit() {
      if (this.loginFormGroup.valid) {
        const { email, password } = this.loginFormGroup.value;
        this.authService.login(email, password)
          .pipe(
            tap({
              error: (error) => {
                this.errorMessage = error.message;
              }
            })
          )
          .subscribe();
      }
    }
  }
