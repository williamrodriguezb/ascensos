  import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { peticionesService } from '../../services/peticiones.service';

import {NgbPagination,NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { GraficosComponent} from '../graficos/grafico.component'

@Component({
  selector: 'hojaPersona',
  templateUrl: '../../views/calificacion/hoja_persona/hoja_persona.component.html',
  styleUrls: ['../../views/calificacion/hoja_persona/hoja_persona.component.css'],
  providers:[ peticionesService,NgbPagination,NgbPaginationConfig],
  })

export class HojaPersonaComponent  {
  public persona;
  public parametro;
  public tiempos;
  public info_juridica;
  public folios;
  public page:number;
  public sanciones;
  public formacion;
  public perfil;
  public datos;
  public cambiosEsp;
  public condecoraciones;
  public distintivos;
  public estimulos_represiones;
  public n_felicitaciones;
  public n_sanciones;
  public felicitaciones;
  public merito;
  public demerito;
  public positivo;
  public negativo;
  public medallas;
  public n_anot_merito;
  public n_conc_positivo;
  public n_anot_demerito;
  public n_conc_negativo;
  public estimulos;
  public pop;
  public seccion;
  public idiomas;
  public tab;
  public tiemposRequisito;
  public tiemposBasicos;
  public n_investigaciones;
  public n_suspenciones;
  public n_separaciones;
  public historial_ascensos;
  public escalafones_x_persona;
  public data_radar;
  public labels_radar:string[];


  constructor(
    private _peticiones:peticionesService,
    private _router:Router,
    private _route: ActivatedRoute,
  ){
    this.pop = 'oculta';
    this.page = 1;
    this.tab = 'calificacion';
    this.data_radar= [
     {data: [0, 0, 0, 0, 0], label: 'Series A'},
     {data: [5, 5, 5, 5, 5], label: 'Series b'},
     {data: [10, 10, 10, 10, 10], label: 'Series b'},
     {data: [15, 15, 15, 15, 15], label: 'Series b'},
   ];
    this.labels_radar = [
      'Desempeño Profesional',
      'Compromiso',
      'Condiciones Personales',
      'Profesionalizacion',
      'Acreditacion de Conducta'
    ];

  }

  ngOnInit(){
    this._route.params.forEach( (params:Params)=>{
      this.parametro = params['id'];
    });
      console.log(this.parametro);
    this._peticiones.persona(this.parametro).subscribe(
      response=>{
        this.persona = response;
        console.log(response);
      },
      error=>{}
    );
  }

  estado_pop(estado, seccion){
    this.pop = estado;
    this.seccion= seccion
    // alert(estado);
  }

  tiempos_requisito(id){
    this._peticiones.getTiempos(id).subscribe(
      response=>{
        this.tiemposRequisito = response['tiempos_requisitos'];
        this.tiemposBasicos = response['tiempos_basicos'];
        this.tiempos = response;
        // console.log(Object.keys(this.tiempos).length);
      },
      error=>{
        console.log(error)
      }
    );
  }
  getFolios(id){
    this._peticiones.folios(id).subscribe(
      response=>{
        this.folios = response;
        console.log(response);
      },
      error=>{}
    );
  }
  est_represiones(id){
    this._peticiones.getEstimulos_represiones(id).subscribe(
      response=>{
        this.estimulos_represiones = response;
        this.felicitaciones = response['felicitaciones'];
        this.merito = response['anotaciones_merito'];
        this.positivo = response['concepto_positivo'];
        this.demerito = response['anotaciones_demerito'];
        this.negativo = response['concepto_negativo'];
        this.estimulos = response['estimulos'];
        this.sanciones = response['sanciones'];
        this.condecoraciones = response['condecoraciones'];
        this.medallas = response['medallas'];
        this.distintivos = response['distintivos'];
        this.n_felicitaciones = Object.keys(response['felicitaciones']).length
        this.n_sanciones = Object.keys(response['sanciones']).length
        this.n_anot_merito = Object.keys(response['anotaciones_merito']).length
        this.n_anot_demerito = Object.keys(response['anotaciones_demerito']).length
        this.n_conc_positivo = Object.keys(response['concepto_positivo']).length
        this.n_conc_negativo = Object.keys(response['concepto_negativo']).length
      },
      error=>{}
    );
  }
  datos_personales(id){
    this._peticiones.getDatos(id).subscribe(
      response=>{
        this.datos = response['datos'];
        this.cambiosEsp = response['cambiosEsp'];
      }
    );
  }
  p_perfil(id){
    this._peticiones.getPerfil(id).subscribe(
      response=>{
        this.idiomas      = response['idiomas'];
        this.formacion    = response['formacion'];
        this.perfil       = response;
      },
      error=>{}
    );
  }
  getTab(seccion){
    this.tab = seccion;
  }
  juridica(id){
    this._peticiones.getJuridica(id).subscribe(
      response=>{
        this.info_juridica=response;
        this.n_investigaciones=Object.keys(response['investigaciones']).length;
        this.n_sanciones=Object.keys(response['sanciones']).length;
        this.n_suspenciones=Object.keys(response['suspenciones']).length;
        this.n_separaciones=Object.keys(response['separaciones']).length;
      },error=>{}
    )
  }
  ascensos(id){
    this._peticiones.getAscensos(id).subscribe(
      response=>{
        this.historial_ascensos = response;
        // console.log(response );
      },
      error=>{
        console.log(error)
      }
    )



    // for (let i = 0; i < Object.keys(this.historial_ascensos).length; i++) {
    // }

  }
}
