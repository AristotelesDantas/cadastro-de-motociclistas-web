import { EfetivoService } from './../service/cadastrar-efetivo/cadastrar-efetivo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VeiculosComponent } from './../veiculos/veiculos.component';
import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageService } from '../service/localstorage/localstorage.service';
import { VeiculoService } from '../service/veiculo/veiculo.service';

@Component({
  selector: 'app-efetivo',
  templateUrl: './efetivo.component.html',
  styleUrls: ['./efetivo.component.css'],
})
export class EfetivoComponent implements OnInit {
  @Input() veiculo!: VeiculosComponent;

  forCadastro!: FormGroup;

  private get namePattern() {
    return /[A-Z][a-z].*/;
  }

  veiculos: any = [];

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private efetivoService: EfetivoService,
    private veiculoService: VeiculoService
  ) {}
  title = `Efetivo`;

  ngOnInit(): void {
    this.forCadastro = this.fb.group({
      veiculo_id: [],
      nameBatismo: [
        null,
        [Validators.required, Validators.pattern(this.namePattern)],
      ],
      nameReal: [
        null,
        [Validators.required, Validators.pattern(this.namePattern)],
      ],
      dateAsp: [null],
      dateFechamento: [null],
    });
    this.buscarTodosVeiculos();
  }
  buscarTodosVeiculos() {
    this.veiculoService.buscarVeiculosServidor().subscribe({
      next: (veiculos) => {
        this.veiculos = veiculos;
        console.log(veiculos);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSubmit() {
    // this.efetivoService.create(this.forCadastro.value);
    const veiculo_id = this.forCadastro.value.veiculo_id
      ? +this.forCadastro.value.veiculo_id
      : [];
    const corpo = { ...this.forCadastro.value, veiculo_id: [veiculo_id] };

    this.efetivoService.criarEfetivoServidor(corpo).subscribe({
      next: (efetivo) => {
        console.log(efetivo);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  cadastroEfetivo() {}
}
