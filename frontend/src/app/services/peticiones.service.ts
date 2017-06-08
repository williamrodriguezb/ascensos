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


  listado(listado,page){
    // let params = 'anio='+listado.year+&categoria=suboficiales&turno=2';
    let params = 'anio='+listado.year+'&categoria='+listado.categoria+'&turno='+listado.turno;
    let headers = this.headers;
    return  this._http.post(GLOBAL.url+'calificacion/listado?page='+page ,params,{headers:headers})
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
 persona(id){
   return this._http.get(GLOBAL.url+'calificacion/persona/'+id)
   .map(res=>res.json());
 }

 getTiempos(id){
   return this._http.get(GLOBAL.url+'calificacion/persona/'+id+'/tiempos')
        .map(res=>res.json());
 }
 folios(id){
   return this._http.get(GLOBAL.url+'calificacion/persona/'+id+'/folios')
        .map(res=>res.json());
 }
 getEstimulos_represiones(id){
   return this._http.get(GLOBAL.url+'calificacion/persona/'+id+'/estimulos-represiones')
        .map(res=>res.json());
 }
 getPerfil(id){
   return this._http.get(GLOBAL.url+'calificacion/persona/'+id+'/perfil')
        .map(res=>res.json());
 }
 getDatos(id){
   return this._http.get(GLOBAL.url+'calificacion/persona/'+id+'/datos')
        .map(res=>res.json());
 }
 getJuridica(id){
   return this._http.get(GLOBAL.url+'calificacion/persona/'+id+'/juridica')
        .map(res=>res.json());
 }
 getAscensos(id){
   return this._http.get(GLOBAL.url+'calificacion/persona/'+id+'/ascensos')
        .map(res=>res.json());
 }
 getLicencias(id){
   return this._http.get(GLOBAL.url+'calificacion/persona/'+id+'/licencias')
        .map(res=>res.json());
 }
}
