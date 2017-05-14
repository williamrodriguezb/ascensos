import {Injectable} from '@angular/core';
import { GLOBAL} from './global';
import {Http , Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()


export class peticionesService{
  constructor(
    private _router:Router,
    private _http:Http
  ){}


  listado(listado){
    let params = 'ano='+listado.year+'&categoria='+listado.categoria+'&turno='+listado.turno;
    let headers= new Headers({
      'Content-Type':'application/x-www-form-urlencoded'
    })
      this._http.post(GLOBAL.url+'calificacion/listado',params,{headers:headers})
    console.log(JSON.stringify(listado));
  }
}
