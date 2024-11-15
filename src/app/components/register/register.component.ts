import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
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
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de continuar.',
        icon: 'warning',
        confirmButtonText: 'Accept'
      });
      return;
    }

    this.registerService.registerUser(this.registerForm.value).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Registro exitoso',
          text: 'El usuario ha sido registrado exitosamente',
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
          text: 'Hubo un problema al registrar el usuario',
          icon: 'error',
          confirmButtonText: 'Accept'
        });
      }
    });
  }
}
