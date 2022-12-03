import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  get(name: string) {
    return localStorage.getItem(name);
  }

  set(valeu: any, name: string) {
    localStorage.setItem(name, JSON.stringify(valeu));
  }

  remove(name: string) {
    localStorage.removeItem(name);
  }

  clear() {
    localStorage.clear();
  }

  save(payload: any, name: string) {
    const data = JSON.stringify(payload);
    //const bcript = btoa(data);
    this.set(data, name);
  }

  buscar(name: string) {
    const data = this.get(name) || '{}';
    return JSON.parse(data);
  }

  validador(value: any) {
    return Object.keys(value).length > 0;
  }
}
