import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.password === this.confirmPassword) {
      // Implement your registration logic here
      console.log('Registration successful');
      this.router.navigate(['/home']);
    } else {
      alert('Passwords do not match');
    }
  }
}
