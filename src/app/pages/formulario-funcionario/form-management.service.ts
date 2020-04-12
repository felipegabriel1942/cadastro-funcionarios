import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { Funcionario } from 'src/app/shared/model/_funcionario.model';
import { UtisService } from 'src/app/shared/utils/utils.service';

@Injectable({
  providedIn: 'root'
})
export class FormManagementService {

  funcionario = new BehaviorSubject(new Funcionario());

  constructor(private utilsService: UtisService) {}

  /**
   * Criar um formulario de funcionario
   */
  fomulario() {
    const formulario = new FormGroup({
      nome: new FormControl(this.funcionario.value.nome, Validators.required),
      mae: new FormControl({value: this.funcionario.value.mae, disabled: true}, Validators.required),
      pai: new FormControl({value: this.funcionario.value.pai, disabled: true}, Validators.required),
      cep: new FormControl(this.funcionario.value.cep, Validators.required),
      dataNascimento: new FormControl(this.funcionario.value.dataNascimento, Validators.required),
      tipoLogradouro: new FormControl(this.funcionario.value.tipoLogradouro ? this.funcionario.value.tipoLogradouro.logradouro : '', Validators.required),
      endereco: new FormControl(this.funcionario.value.endereco, Validators.required),
      numero: new FormControl(this.funcionario.value.numero, Validators.required),
      uf: new FormControl(this.funcionario.value.uf, Validators.required),
      cidade: new FormControl({value: this.funcionario.value.cidade ? this.funcionario.value.cidade.municipio : '', disabled: true}, Validators.required),
      ddd: new FormControl(this.funcionario.value.ddd),
      telefone: new FormControl(this.funcionario.value.telefone),
      email: new FormControl(this.funcionario.value.email, Validators.email),
      estadoCivil: new FormControl(this.funcionario.value.estadoCivil ? this.funcionario.value.estadoCivil.estadoCivil : '', Validators.required),
      nacionalidade: new FormControl(this.funcionario.value.nacionalidade ? this.funcionario.value.nacionalidade.nacionalidade : '', Validators.required),
      escolaridade: new FormControl(this.funcionario.value.escolaridade ? this.funcionario.value.escolaridade.escolaridade : '', Validators.required),
      ufNascimento: new FormControl({value: this.funcionario.value.ufNascimento ? this.funcionario.value.ufNascimento.uf : '', disabled: true}, Validators.required),
      municipioNascimento: new FormControl({value: this.funcionario.value.municipioNascimento ? this.funcionario.value.municipioNascimento.municipio : '', disabled: true}, Validators.required),
      racaCor: new FormControl(this.funcionario.value.racaCor ? this.funcionario.value.racaCor.raca : '', Validators.required),
      sexo: new FormControl(this.funcionario.value.sexo ? this.funcionario.value.sexo.sexo : '', Validators.required)
    });

    this.validacoes(formulario);

    return formulario;
  }

  validacoes(formulario: FormGroup) {

    // Validações do campo UF e suas reflexões no codigo
    formulario.get('uf').valueChanges.subscribe(() => {
      if (!!formulario.get('uf').value) {
        formulario.get('cidade').enable();
      } else {
        formulario.get('cidade').disable();
      }
    });


    // Validações do campo Nome e suas reflexões no codigo
    formulario.get('nome').valueChanges.subscribe(() => {
      if (!!formulario.get('nome').value) {
        formulario.get('mae').enable();
        formulario.get('pai').enable();
      } else {
        formulario.get('mae').disable();
        formulario.get('pai').disable();
      }
    });

    // Validações do campo nacionalidade e suas reflexões no codigo
    formulario.get('nacionalidade').valueChanges.subscribe(() => {
      if (!!formulario.get('nacionalidade').value) {
        if (formulario.get('nacionalidade').value === 'Brasileiro') {
          formulario.get('ufNascimento').enable();
        } else {
          formulario.get('ufNascimento').disable();
          formulario.get('municipioNascimento').disable();
          formulario.get('ufNascimento').setValue('');
          formulario.get('municipioNascimento').setValue('');
        }
      }
    });


    // Validações do campo Nascimento e suas reflexões no codigo
    formulario.get('ufNascimento').valueChanges.subscribe(() => {
      if (!!formulario.get('ufNascimento').value) {
        formulario.get('municipioNascimento').enable();
      } else {
        formulario.get('municipioNascimento').disable();
        formulario.get('municipioNascimento').setValue('');
      }
    });
  }
}
