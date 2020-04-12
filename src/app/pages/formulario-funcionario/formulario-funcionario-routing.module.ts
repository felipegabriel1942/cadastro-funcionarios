import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioFuncionarioComponent } from './formulario-funcionario.component';


const routes: Routes = [{path: '', component: FormularioFuncionarioComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularioFuncionarioRoutingModule { }
