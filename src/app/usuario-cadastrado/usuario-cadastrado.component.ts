import { UserService } from './../service/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../service/localstorage/localstorage.service';

@Component({
  selector: 'app-usuario-cadastrado',
  templateUrl: './usuario-cadastrado.component.html',
  styleUrls: ['./usuario-cadastrado.component.css'],
})
export class UsuarioCadastradoComponent {
  forCadastrodeUsuario!: FormGroup;

  private get passwordPattern() {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/;
  }
  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private user: UserService
  ) {}

  ngOnInit(): void {
    this.forCadastrodeUsuario = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
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

  onSubmit() {
    const user = this.user.verificarLogin(
      this.forCadastrodeUsuario.value.name,
      this.forCadastrodeUsuario.value.password
    );
    if (user) {
      console.log('usuario já cadastrado');
    } else {
      this.user
        .criarNovoUsuario(this.forCadastrodeUsuario.value)
        .then(() => {console.log('Usuario criado com sucesso')})
        .catch((error) => {
          console.error(error);
        });
    }
  }
}
