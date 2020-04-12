import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularioFuncionarioRoutingModule } from './formulario-funcionario-routing.module';
import { FormularioFuncionarioComponent } from './formulario-funcionario.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';


@NgModule({
  declarations: [FormularioFuncionarioComponent],
  imports: [
    CommonModule,
    FormularioFuncionarioRoutingModule,
    AngularMaterialModule
  ]
})
export class FormularioFuncionarioModule { }
