
import { map, Observable } from 'rxjs';
import { LocalStorageService } from './../localstorage/localstorage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
export interface Efetivo {
  nomeBatismo: string;
  nomeReal: string;
  dateAsp: string;
  dateFechamento: string;
  id?: number;
  veiculo_id: []
}

@Injectable({
  providedIn: 'root',
})
export class EfetivoService {
  private readonly api: string = environment.api;
  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {
    //this.efetivoList = this.get();
    this.buscarEfetivoDoServidor().subscribe({
      next: (efetivos) => {
        console.log(efetivos);
        this.efetivoList = efetivos;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  efetivoList: Efetivo[] = [];
  create(user: Efetivo) {
    const id = this.efetivoList[this.efetivoList.length - 1]?.id || 0;
    this.efetivoList.push({ ...user, id: id + 1 });
    this.localStorageService.save(this.efetivoList, 'efetivoList');
  }
  get() {
    const efetivoList = this.localStorageService.buscar('efetivoList');
    if (this.localStorageService.validador(efetivoList)) {
      this.efetivoList = JSON.parse(efetivoList);
    } else {
      this.efetivoList = [];
    }
    return this.efetivoList;
  }
  update(efetivo: Efetivo) {
    const efetivos = this.get();
    efetivos[efetivos.findIndex((v: any) => efetivo.id === v.id)] = efetivo;
    this.localStorageService.save(efetivos, 'efetivoList');
  }
  remove(user: Efetivo) {
    const efetivos = this.get();
    const index = this.efetivoList.findIndex((u) => user.id === u.id);
    if (index >= 0) {
      efetivos.splice(index, 1);
      this.localStorageService.save(efetivos, 'efetivoList');
    }
  }
  findByName(placa: string) {
    const efetivos = this.get();
    const efetivo = efetivos.find((v: any) => placa === v.placa);
    return efetivo;
  }
  buscarPeriodo(dataInicio: string, dataFim: string) {
    let efetivos = this.get().map((efetivo) => ({
      ...efetivo,
      dateAsp: this.toGetTime(efetivo.dateAsp),
    }));
    const dtInicio = this.toGetTime(dataInicio);
    const dtFim = this.toGetTime(dataFim);

    efetivos = efetivos.filter(
      (efetivo) => efetivo.dateAsp >= dtInicio && efetivo.dateAsp <= dtFim
    );
    return efetivos;
  }
  buscarPeriodoServidor(dataInicio: string, dataFim: string): Observable<any> {
    return this.buscarEfetivoDoServidor().pipe(
      map((EfetivoDoServidor) => {
        let efetivos = EfetivoDoServidor.map((efetivo: any) => ({
          ...efetivo,
          dateAsp: this.toGetTime(efetivo.dateAsp),
        }));

        const dtInicio = this.toGetTime(dataInicio);
        const dtFim = this.toGetTime(dataFim);
        efetivos = efetivos.filter(
          (efetivo: any) => efetivo.dateAsp >= dtInicio && efetivo.dateAsp <= dtFim
        );
        return efetivos;
      })
    );
  }
  toGetTime(date: string) {
    return new Date(date).getTime();
  }
  toString(date: number) {
    return new Date(date).toLocaleDateString();
  }
  criarEfetivoServidor(efetivo: any): Observable<any> {
    const id = this.efetivoList[this.efetivoList.length - 1]?.id || 0;
    return this.http.post(this.api + '/efetivos', { ...efetivo, id: id + 1 });
  }
  buscarEfetivoDoServidor(): Observable<any> {
    return this.http.get(this.api + '/efetivos');
  }
}
