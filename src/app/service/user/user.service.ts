import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LocalStorageService } from '../localstorage/localstorage.service';
export interface User {
  name: string;
  email: string;
  id?: number;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly api: string = environment.api;
  userList: User[] = [];
  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {
    //this.userList = this.get();
    this.buscarTodosUsuarios()
      .then((users) => {
        console.log(users);
        this.userList = users;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  create(user: User) {
    const id = this.userList[this.userList.length - 1]?.id || 0;
    this.userList.push({ ...user, id: id + 1 });
    this.localStorageService.save(this.userList, 'userList');
  }
  get() {
    const userList = this.localStorageService.buscar('userList');
    if (this.localStorageService.validador(userList)) {
      this.userList = JSON.parse(userList);
    } else {
      this.userList = [];
    }
    return this.userList;
  }
  update(user: User) {
    this.userList[this.userList.findIndex((u) => user.id === u.id)] = user;
  }
  remove(user: User) {
    const index = this.userList.findIndex((u) => user.id === u.id);
    if (index >= 0) {
      this.userList.splice(index, 1);
    }
  }
  findByName(name: string) {
    const user = this.userList.find((u) => name === u.name);
    return user;
  }
  login(name: string, senha: string) {
    const user = this.verificarLogin(name, senha);

    if (user) {
      this.localStorageService.set(this.createToken(user), 'token');
      return true;
    }
    return null;
  }
  async verificarLoginDoServidor(name: string, senha: string) {
    const users = await this.buscarTodosUsuarios();
    const user = users.find(
      (u: any) => name === u.name && senha === u.password
    );
    return user;
  }
  async loginDoServidor(name: string, senha: string) {
    const user = await this.verificarLoginDoServidor(name, senha);

    if (user) {
      this.localStorageService.set(this.createToken(user), 'token');
      return true;
    }
    return null;
  }
  createToken(user: User) {
    const data = JSON.stringify(user);
    const token = window.btoa(data);
    return token;
  }
  verificarLogin(name: string, senha: string) {
    const users = this.get();
    const user = users.find((u) => name === u.name && senha === u.password);
    return user;
  }

  buscarTodosUsuarios(): Promise<any> {
    return this.http.get(this.api + '/users').toPromise();
  }
  criarNovoUsuario(user: User): Promise<any> {
    const id = this.userList[this.userList.length - 1]?.id || 0;

    return this.http
      .post(this.api + '/users', { ...user, id: id + 1 })
      .toPromise();
  }
}
