import { VeiculoService } from './../service/veiculo/veiculo.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-consulta-veiculo',
  templateUrl: './consulta-veiculo.component.html',
  styleUrls: ['./consulta-veiculo.component.css'],
})
export class ConsultaVeiculoComponent implements OnInit {
  forConsPlaca: FormControl = new FormControl(null);
  results: any[] = [];

  colunas = ['id', 'veic', 'marca', 'modelo', 'placa', 'date', 'comb'];
  constructor(private veiculoService: VeiculoService) {}

  ngOnInit(): void {

  }

  consultar() {
    const veiculo = this.veiculoService.findByName(this.forConsPlaca.value);
    this.results = veiculo ? [veiculo] : [];
  }
}
