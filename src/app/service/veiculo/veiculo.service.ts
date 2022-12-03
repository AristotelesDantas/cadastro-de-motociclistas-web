import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './../localstorage/localstorage.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Veiculo {
  veic: string;
  marca: string;
  modelo: string;
  placa: string;
  date: string;
  comb: string;
  id?: number;
}
@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  private readonly api: string = environment.api;
  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {
    // this.veiculoList = this.get();
    //na promise usamos then e catch
    //no observable usamos subscribe
    this.buscarVeiculosServidor().subscribe({
      next: (veiculos) => {
        console.log(veiculos);
        this.veiculoList= veiculos
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  veiculoList: Veiculo[] = [];
  create(veiculo: Veiculo) {
    const id = this.veiculoList[this.veiculoList.length - 1]?.id || 0;
    this.veiculoList.push({ ...veiculo, id: id + 1 });
    this.localStorageService.save(this.veiculoList, 'veiculoList');
  }
  criarVeiculoServidor(veiculo: Veiculo): Observable<any> {
    const id = this.veiculoList[this.veiculoList.length - 1]?.id || 0;
    return this.http.post(this.api + '/veiculos', { ...veiculo, id: id + 1 });
  }
  buscarVeiculosServidor(): Observable<any> {
    return this.http.get(this.api + '/veiculos');
  }
  get() {
    const veiculoList = this.localStorageService.buscar('veiculoList');
    if (this.localStorageService.validador(veiculoList)) {
      this.veiculoList = JSON.parse(veiculoList);
    } else {
      this.veiculoList = [];
    }
    return this.veiculoList;
  }
  update(veiculo: Veiculo) {
    const veiculos = this.get();
    veiculos[veiculos.findIndex((v: any) => veiculo.id === v.id)] = veiculo;
    this.localStorageService.save(veiculos, 'veiculoList');
  }
  remove(user: Veiculo) {
    const veiculos = this.get();
    const index = this.veiculoList.findIndex((u) => user.id === u.id);
    if (index >= 0) {
      veiculos.splice(index, 1);
      this.localStorageService.save(veiculos, 'veiculoList');
    }
  }
  findByName(placa: string) {
    const veiculos = this.get();
    const veiculo = veiculos.find((v: any) => placa === v.placa);
    return veiculo;
  }
}
