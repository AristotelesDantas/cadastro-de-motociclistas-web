import { UserService } from './../service/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../service/localstorage/localstorage.service';
import { Router } from '@angular/router';
//import { UsuarioCadastradoComponent } from '../usuario-cadastrado/usuario-cadastrado.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  forLogin!: FormGroup;

  private get passwordPattern() {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;
  }
  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private user: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.forLogin = this.fb.group({
      name: [null, [Validators.required]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(this.passwordPattern),
        ],
      ],
    });
  }

 async onSubmit() {
    const msg = await this.user.loginDoServidor(
      this.forLogin.value.name,
      this.forLogin.value.password
    );
    if (msg) {
      this.router.navigateByUrl('/inicio');
    }else{
      alert('usuario ou senha incorretos')
    }

  }
}
