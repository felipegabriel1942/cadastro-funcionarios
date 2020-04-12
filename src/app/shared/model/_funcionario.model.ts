import { Injectable } from '@angular/core';
import { TipoLogradouro } from './tipo-logradouro.model';
import { Uf } from './uf.model';
import { Municipio } from './municipio.model';
import { EstadoCivil } from './estado-civil.model';
import { Nacionalidade } from './nacionalidade.model';
import { Escolaridade } from './escolaridade.model';
import { RacaCor } from './raca-cor.model';
import { Sexo } from './sexo.model';

@Injectable({
  providedIn: 'root'
})
export class Funcionario {
  constructor(public nome?: string,
              public mae?: string,
              public pai?: string,
              public cep?: string,
              public dataNascimento?: Date,
              public tipoLogradouro?: TipoLogradouro,
              public endereco?: string,
              public numero?: number,
              public uf?: Uf,
              public cidade?: Municipio,
              public ddd?: string,
              public telefone?: string,
              public email?: string,
              public estadoCivil?: EstadoCivil,
              public nacionalidade?: Nacionalidade,
              public escolaridade?: Escolaridade,
              public ufNascimento?: Uf,
              public municipioNascimento?: Municipio,
              public racaCor?: RacaCor,
              public sexo?: Sexo) {}
}
