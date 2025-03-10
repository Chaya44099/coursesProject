import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserType } from '../../../models/user';
import {  MatCardModule } from '@angular/material/card';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logup-form',
  imports:[MatFormFieldModule,MatCardModule,MatInputModule, MatButtonModule, MatIconModule,ReactiveFormsModule,MatSelectModule],
  templateUrl: './logup-form.component.html',
  styleUrl: './logup-form.component.css'
})
export class LogupFormComponent {
 
  registerForm: FormGroup;
  constructor( private fb: FormBuilder,private authService: AuthenticationService,private router: Router) {
   
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      const user = new UserType(
          this.registerForm.value.name,
          this.registerForm.value.email,
          this.registerForm.value.password,
          this.registerForm.value.role
      );

      console.log(user);
      this.authService.register(user).subscribe(
          response => {
              console.log('Registration successful', response);
              this.router.navigate(['/courseslist']);
          },
          error => {
            if (error.status === 500) {
              alert('User is already register');
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 1000); 
          }
        }
      );
  }
  }
}

