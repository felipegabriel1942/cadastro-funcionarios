import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtisService {

  nullToEmpty(objeto: any) {
    if (objeto) {
      return objeto[0];
    }
    return '';
  }
}
