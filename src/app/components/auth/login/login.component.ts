import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Administrator } from '../../../interfaces/administrator';
import { Router } from '@angular/router';
import { AdministratorService } from '../../../services/administrator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: Administrator;
  formLogin: FormGroup;
  data: Administrator[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private apiService: AdministratorService) {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.user = {
      id: null,
      name: "",
      last_name: "",
      email: "",
      password: "",
    };
  }

  login() {
    if (this.formLogin.valid) {
      console.log(this.data);
      const user = this.data.find(
        (item) => this.user.email == item.email && this.user.password == item.password
      );
      if (user?.id) {
        localStorage.setItem('user', user.id.toString());
        const loginPromise = new Promise<void>((resolve) => {
          resolve();
        });
      
        loginPromise.then(() => {
          this.router.navigate(['/dashboard']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: `Usuario y/o clave incorrectos`,
        });
      }
    }
  }

  getAllAdministrators() {
    this.apiService.getAllAdministrators().subscribe((data) => {
      this.data = data;
    })
  }

  ngOnInit() {
    this.getAllAdministrators();
  }
}
