import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Uf } from 'src/app/shared/model/uf.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormularioFuncionarioService {

  constructor(private http: HttpClient) {}

  requisicaoGetHttp(referencia: string) {
    return this.http.get<any[]>('https://cadastro-funcionario-rxjs.firebaseio.com/' + referencia + '.json');
  }

}
