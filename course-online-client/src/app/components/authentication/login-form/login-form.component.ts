import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {  MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/auth/authentication.service';

@Component({
  selector: 'app-login-form',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          console.log('Login successful', response);
          this.router.navigate(['/courseslist']);
        },
        error => {
          if (error.status === 404) {
            alert('User not found yow pass to register');
            setTimeout(() => {
              this.router.navigate(['/logup']);
            }, 1000); 
          } else if (error.status === 400) {
            alert('Invalid credentials');
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000); 
          } else {
            alert('An unexpected error occurred');
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);
          }
        }

      );
    }
  }
}

