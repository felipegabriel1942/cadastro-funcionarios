import { Component, OnInit } from '@angular/core';
import { FormularioFuncionarioService } from './formulario-funcionario.service';
import { Uf } from 'src/app/shared/model/uf.model';
import { forkJoin, Observable } from 'rxjs';
import { Municipio } from 'src/app/shared/model/municipio.model';
import { tap, filter, map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Funcionario } from 'src/app/shared/model/_funcionario.model';

@Component({
  selector: 'app-formulario-funcionario',
  templateUrl: './formulario-funcionario.component.html',
  styleUrls: ['./formulario-funcionario.component.css']
})
export class FormularioFuncionarioComponent implements OnInit {

  formulario: FormGroup;
  funcionario = new Funcionario();
  uf$: Observable<Uf[]>;
  municipios$: Observable<Municipio[]>;

  constructor(private formularioFuncionarioService: FormularioFuncionarioService) { }

  ngOnInit() {
    this.formularioBuilder();
    this.requisicoesIniciaisHTTP();

  }

  formularioBuilder() {
    this.formulario = new FormGroup({
      nome: new FormControl(this.funcionario.nome),
      mae: new FormControl(),
      pai: new FormControl(),
      cep: new FormControl(),
      dataNascimento: new FormControl(),
      tipoLogradouro: new FormControl(),
      endereco: new FormControl(),
      numero: new FormControl(),
      uf: new FormControl(),
      cidade: new FormControl(),
      ddd: new FormControl(),
      telefone: new FormControl(),
      email: new FormControl(),
      estadoCivil: new FormControl(),
      nacionalidade: new FormControl(),
      escolaridade: new FormControl(),
      ufNascimento: new FormControl(),
      municipioNascimento: new FormControl(),
      racaCor: new FormControl(),
      sexo: new FormControl()
    });
  }


  requisicoesIniciaisHTTP() {
    this.uf$ = this.formularioFuncionarioService.requisicaoGetHttp('uf');
    return forkJoin([this.uf$]).subscribe();
  }

  setUf(uf: Uf, event: any) {
    event.isUserInput ? this.filtrarMunicipioPorUf(uf) : '';
  }

  setMunicipio(municipio: Municipio) {

  }

  filtrarMunicipioPorUf(uf: Uf) {
    this.municipios$ = this.formularioFuncionarioService.requisicaoGetHttp('municipio')
    .pipe(
      map((municipio: Municipio[]) => municipio.filter(m => m.uf.uf === uf.uf)
    ));
  }


  alterarValor() {
    this.funcionario.nome = Math.random().toString();
    console.log(this.funcionario.nome);
    console.log(this.formulario.value);
  }
}
