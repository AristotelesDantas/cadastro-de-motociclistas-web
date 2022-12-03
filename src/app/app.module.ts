import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { EfetivoComponent } from './efetivo/efetivo.component';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { ConsultaNomeComponent } from './consulta-nome/consulta-nome.component';
import { ConsultaAspirantadoComponent } from './consulta-aspirantado/consulta-aspirantado.component';
import { ConsultaVeiculoComponent } from './consulta-veiculo/consulta-veiculo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabelaConsultaComponent } from './tabela-consulta/tabela-consulta.component';
import { UsuarioCadastradoComponent } from './usuario-cadastrado/usuario-cadastrado.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    EfetivoComponent,
    FooterComponent,
    VeiculosComponent,
    LoginComponent,
    InicioComponent,
    ConsultaComponent,
    ConsultaNomeComponent,
    ConsultaAspirantadoComponent,
    ConsultaVeiculoComponent,
    TabelaConsultaComponent,
    UsuarioCadastradoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
