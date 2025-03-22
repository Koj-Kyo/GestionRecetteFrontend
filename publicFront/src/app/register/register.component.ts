import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { firstname, lastname, email, password } = this.registerForm.value;
      this.authService.register(firstname, lastname, email, password)
        .pipe(
          tap({
            next: (response) => {
              this.successMessage = 'Inscription réussie';
              console.log('Inscription réussie', response);
              this.router.navigate(['/home']).then(r => console.log('Redirection vers /home'));
            },
            error: (error) => {
              this.errorMessage = error.message;
            }
          })
        )
        .subscribe();
    }
  }
}
