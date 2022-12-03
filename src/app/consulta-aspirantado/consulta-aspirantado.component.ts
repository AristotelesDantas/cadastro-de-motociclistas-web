import { EfetivoService } from './../service/cadastrar-efetivo/cadastrar-efetivo';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map, pipe } from 'rxjs';

@Component({
  selector: 'app-consulta-aspirantado',
  templateUrl: './consulta-aspirantado.component.html',
  styleUrls: ['./consulta-aspirantado.component.css'],
})
export class ConsultaAspirantadoComponent implements OnInit {
  forBuscaAsp!: FormGroup;
  results: any[] = [];

  colunas = ['id', 'nameBatismo', 'nameReal', 'dateAsp', 'dateFechamento'];

  constructor(
    private formBuilder: FormBuilder,
    private efetivoService: EfetivoService
  ) {}

  ngOnInit(): void {
    this.forBuscaAsp = this.formBuilder.group({
      dateInicio: [null],
      dateFim: [null],
    });
  }

  consultar() {
    this.efetivoService
      .buscarPeriodoServidor(
        this.forBuscaAsp.value.dateInicio,
        this.forBuscaAsp.value.dateFim
      )
      .pipe(
        map((efetivos: any) => {
          return efetivos.map((efetivo: any) => ({
            ...efetivo,
            dateAsp: this.efetivoService.toString(efetivo.dateAsp),
          }));
        })
      )
      .subscribe({
        next: (results) => {
          console.log(results);
          this.results = results;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
