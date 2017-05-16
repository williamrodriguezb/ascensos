import {Injectable} from '@angular/core';
import { GLOBAL} from './global';
import {Http , Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()


export class peticionesService{

  private headers = new Headers({
    'Content-Type':'application/x-www-form-urlencoded'
  }) ;
  constructor(
    private _router:Router,
    private _http:Http
  ){}


  listado(listado){
    // let params = 'anio='+listado.year+&categoria=suboficiales&turno=2';
    let params = 'anio='+listado.year+'&categoria='+listado.categoria+'&turno='+listado.turno;
    let headers = this.headers;
    return  this._http.post(GLOBAL.url+'calificacion/listado',params,{headers:headers})
      .map(res => res.json());
  }
  listado_consultaPersona(consultaPersona){
    let params = "documento="+consultaPersona.documento+"&apellidos="+consultaPersona.apellidos
    +"&nombres="+consultaPersona.nombres+"&categoria="+consultaPersona.categoria;

    console.log(consultaPersona);
   return this._http.post(GLOBAL.url+'calificacion/persona/buscar',params,{headers:this.headers})
   .map(res=>res.json())

   ;
 }
 persona(){
   return this._http.get(GLOBAL.url+'calificacion/persona/9531508')
   .map(res=>res.json())
 }
}
