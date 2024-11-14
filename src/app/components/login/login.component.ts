import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { Login } from '../../models/login.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink],
})
export class LoginComponent implements OnInit {
  loginData: Login = { username: '', password: '' };
  isLoggedIn: boolean = false;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.loginData.username = storedUser;
      this.isLoggedIn = true;
    }
  }

  login(event?: Event): void {
    if (event) {
      event.preventDefault(); 
    }
  
    if (this.loginData.username && this.loginData.password) {
      console.log('Enviando datos de inicio de sesión:', this.loginData);
      this.loginService.loginUser(this.loginData).subscribe(
        (response: string) => {
          console.log('Respuesta del servidor:', response);
          localStorage.setItem('user', this.loginData.username);
          this.isLoggedIn = true;
          this.loginData.password = '';
  
          Swal.fire({
            title: '¡Bienvenido!',
            text: 'Inicio de sesión exitoso',
            imageUrl: '/assets/codigo-de-barras.gif',
            imageWidth: 100,
            imageHeight: 100,
            showConfirmButton: false,
            timer: 1500,
            position: 'center',
          }).then(() => {
            this.router.navigate(['/products']);
          });
        },
        (error) => {
          console.error('Error en la solicitud de inicio de sesión:', error);
          if (error.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Nombre de usuario o contraseña incorrectos.',
              showConfirmButton: true,
              confirmButtonText: 'Reintentar',
              customClass: {
                confirmButton: 'btn btn-danger',
              },
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al procesar su solicitud. Intente de nuevo más tarde.',
              showConfirmButton: true,
              confirmButtonText: 'Entendido',
            });
          }
        }
      );
    } else {
      Swal.fire({
        title: 'Campos vacíos',
        text: 'Por favor, ingrese nombre de usuario y contraseña.',
        imageUrl: '/assets/formulario.gif',
        imageWidth: 100,
        imageHeight: 100,
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        customClass: {
          confirmButton: 'btn btn-warning',
        },
      });
    }
  }

  logout(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas cerrar la sesión?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        localStorage.clear();
      
        
        this.isLoggedIn = false;
        this.loginData = { username: '', password: '' };
        
        Swal.fire({
          title: '¡Hasta pronto!',
          text: 'Has cerrado sesión exitosamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        }).then(() => {
          this.router.navigate(['/login']);
        });
      }
    });
  }
}