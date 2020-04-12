import { Component, OnInit } from '@angular/core';
import { FormularioFuncionarioService } from './formulario-funcionario.service';
import { Uf } from 'src/app/shared/model/uf.model';
import { forkJoin, Observable } from 'rxjs';
import { Municipio } from 'src/app/shared/model/municipio.model';
import { tap, filter, map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/shared/model/_funcionario.model';
import { FormManagementService } from './form-management.service';
import { EstadoCivil } from 'src/app/shared/model/estado-civil.model';
import { TipoLogradouro } from 'src/app/shared/model/tipo-logradouro.model';
import { Escolaridade } from 'src/app/shared/model/escolaridade.model';
import { RacaCor } from 'src/app/shared/model/raca-cor.model';
import { Sexo } from 'src/app/shared/model/sexo.model';
import { Nacionalidade } from 'src/app/shared/model/nacionalidade.model';

@Component({
  selector: 'app-formulario-funcionario',
  templateUrl: './formulario-funcionario.component.html',
  styleUrls: ['./formulario-funcionario.component.css']
})
export class FormularioFuncionarioComponent implements OnInit {

  formulario: FormGroup;
  uf$: Observable<Uf[]>;
  estadoCivil$: Observable<EstadoCivil[]>;
  logradouro$: Observable<TipoLogradouro[]>;
  municipios$: Observable<Municipio[]>;
  municipiosNaturalidade$: Observable<Municipio[]>;
  escolaridade$: Observable<Escolaridade[]>;
  raca$: Observable<RacaCor[]>;
  sexo$: Observable<Sexo[]>;
  nacionalidade$: Observable<Nacionalidade[]>;

  constructor(private formularioFuncionarioService: FormularioFuncionarioService,
              public formManagementService: FormManagementService) { }

  ngOnInit() {
    this.requisicoes();
    //Recebe o formulario que foi criado no serviço de gerenciamento
    this.formulario = this.formManagementService.fomulario();
  }

  requisicoes() {
    this.uf$ = this.formularioFuncionarioService.requisicaoGetHttp('uf');
    this.estadoCivil$ = this.formularioFuncionarioService.requisicaoGetHttp('estadoCivil');
    this.logradouro$ = this.formularioFuncionarioService.requisicaoGetHttp('logradouro');
    this.escolaridade$ = this.formularioFuncionarioService.requisicaoGetHttp('escolaridade');
    this.raca$ = this.formularioFuncionarioService.requisicaoGetHttp('raca');
    this.sexo$ = this.formularioFuncionarioService.requisicaoGetHttp('sexo');
    this.nacionalidade$ = this.formularioFuncionarioService.requisicaoGetHttp('nacionalidade');

    return forkJoin([this.uf$, this.estadoCivil$, this.logradouro$, this.escolaridade$, this.raca$, this.sexo$, this.nacionalidade$]).subscribe();
  }

  filtrarMunicipioPorUf(uf: Uf, event: any, campo: any) {
    if (event.isUserInput) {
      const municipios$ = this.formularioFuncionarioService.requisicaoGetHttp('municipio')
      .pipe(
        map((municipio: Municipio[]) => municipio.filter(m => m.uf.uf === uf.uf)
      ));

      campo === 'uf' ? this.municipios$ = municipios$ : this.municipiosNaturalidade$ = municipios$;

    }
  }
}
