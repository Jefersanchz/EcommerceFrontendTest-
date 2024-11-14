import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
  
    });
  }

  registerUser(): void {
    if (this.registerForm.invalid) {
      Swal.fire({
        title: 'Incomplete Fields',
        text: 'Please complete all fields before continuing.',
        icon: 'warning',
        confirmButtonText: 'Accept'
      });
      return;
    }

    this.registerService.registerUser(this.registerForm.value).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Successful Registration',
          text: 'The user has been successfully registered',
          imageUrl: '/assets/comprar.gif',
          imageWidth: 80,
          imageHeight: 80,
          imageAlt: 'Success Icon',
          timer: 1200,
          customClass: {
            popup: 'small-swal-popup'
          }
        }).then(() => {
          this.router.navigate(['/login']);
        });
        this.registerForm.reset();
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'There was a problem registering the user',
          icon: 'error',
          confirmButtonText: 'Accept'
        });
      }
    });
  }
}
