import { UsuarioCadastradoComponent } from './usuario-cadastrado/usuario-cadastrado.component';
import { LoginComponent } from './login/login.component';
import { VeiculosComponent } from './veiculos/veiculos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './consulta/consulta.component';
import { EfetivoComponent } from './efetivo/efetivo.component';
import { InicioComponent } from './inicio/inicio.component';
import { ConsultaAspirantadoComponent } from './consulta-aspirantado/consulta-aspirantado.component';
import { ConsultaNomeComponent } from './consulta-nome/consulta-nome.component';
import { ConsultaVeiculoComponent } from './consulta-veiculo/consulta-veiculo.component';


const routes: Routes = [
  { path: ``, redirectTo: `login`, pathMatch: `full` },
  { path: `login`, component: LoginComponent },
  { path: `inicio`, component: InicioComponent },
  { path: `efetivo`, component: EfetivoComponent },
  { path: `consulta`, component: ConsultaComponent },
  { path: `veiculos`, component: VeiculosComponent },
  { path: `consulta-aspirantado`, component: ConsultaAspirantadoComponent },
  { path: `consulta-nome`, component: ConsultaNomeComponent },
  { path: `consulta-veiculo`, component: ConsultaVeiculoComponent },
  { path: `usuario-cadastrado`, component: UsuarioCadastradoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
