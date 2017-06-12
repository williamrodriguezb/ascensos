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
  public regimen;
  public page_folios:number;
  public page_formacion:number;
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
  public licencias;
  public historial_ascensos;
  public escalafones_x_persona;
  public data_radar;
  public data_line;
  public seccion_p;
  public seccion_dato;
  public  count_formacion;
  public  dona_labels:string[];
  public  dona_data;
  public ver_evaluador:boolean;
  public labels_radar:string[];
  public labels_line:string[];
  public color_radar:Array<any>;
  public color_line:Array<any>;
  constructor(
    private _peticiones:peticionesService,
    private _router:Router,
    private _route: ActivatedRoute,
  ){
    this.pop = 'oculta';
    this.page_folios = 1;
    this.page_formacion = 1;
    this.tab = 'calificacion';
    this.ver_evaluador = false;
    this.dona_data=[];
    this.dona_labels=[];
    this.data_radar= [

     {data: [0, 0, 0, 0, 0] },
     {data: [4, 4, 4, 4, 4], label: 'Malo'},
     {data: [8, 8, 8, 8, 8], label: 'Regular'},
     {data: [12, 12, 12, 12, 12], label: 'Bueno'},
    //  {data: [15, 15, 15, 15, 15], label: 'Series b'},

   ];
   this.color_line= [
     {backgroundColor: 'rgba(38, 134, 216,0)'},
     {
       backgroundColor: 'rgba(38, 134, 216,0.5)',
       borderColor:  'rgba(38, 134, 216,1)',
     }
   ]
   this.color_radar =  [
     { // verde
       backgroundColor: 'rgba(139, 195, 74, 0)',
       borderColor: 'rgba(148,159,177,0)',
       pointBackgroundColor: 'rgba(148,159,177,0)',
       pointBorderColor: 'rgba(148,159,177,0)',
       pointHoverBackgroundColor: 'rgba(148,159,177,0)',
       pointHoverBorderColor: 'rgba(148,159,177,0)'
     },
     { // rojo
       backgroundColor: 'rgba(201, 48, 44, 0.2)',
       borderColor: 'rgba(201, 48, 44, 0.3)',
       pointBackgroundColor: 'rgba(148,159,177,0)',
       pointBorderColor: 'rgba(148,159,177,0)',
       pointHoverBackgroundColor:'rgba(148,159,177,0)',
       pointHoverBorderColor: 'rgba(148,159,177,0)'
     },
     { // Amarillo
       backgroundColor: 'rgba(255, 230, 8, 0.4)',
       borderColor: 'rgba(255, 235, 59, 0.3)',
       pointBackgroundColor: 'rgba(148,159,177,0)',
       pointBorderColor: 'rgba(148,159,177,0)',
       pointHoverBackgroundColor: 'rgba(148,159,177,0)',
       pointHoverBorderColor: 'rgba(148,159,177,0)'
     },{ // verde
       backgroundColor: 'rgba(68, 157, 68,0.2)',
       borderColor: 'rgba(68, 157, 68,0.3)',
       pointBackgroundColor: 'rgba(148,159,177,0)',
       pointBorderColor: 'rgba(148,159,177,0)',
       pointHoverBackgroundColor: 'rgba(148,159,177,0)',
       pointHoverBorderColor: 'rgba(148,159,177,0)'
     }
]
    // this.data_line= [{data: [0, 0,0,0]},{data: [20, 10,10,8]}];
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
    this._peticiones.persona(this.parametro).subscribe(
      response=>{
        this.persona = response;
      },
      error=>{}
    );

    this.datos_personales(this.parametro);
    this.tiempos_requisito(this.parametro);
    this.getFolios(this.parametro);
    this.est_represiones(this.parametro);
    this.p_perfil(this.parametro);
    this.juridica(this.parametro);
    this.ascensos(this.parametro)
  }

  estado_pop(estado, seccion){
    this.pop = estado;
    this.seccion= seccion
    // alert(estado);
  }
  seccion_nav(p){
    this.seccion_p= p
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
        this.regimen = response['regimen'];
      }
    );
  }
  p_perfil(id){
    this._peticiones.getPerfil(id).subscribe(
      response=>{
        this.idiomas      = response['idiomas'];
        this.formacion    = response['formacion'];
        this.count_formacion    = response['count_formacion'];
        this.perfil       = response;
        let array_porcentaje=[]

        for (let c in this.count_formacion) {
          let n_formacion;
          let porcentaje;
            n_formacion = Object.keys(response['formacion']).length
            porcentaje = ((this.count_formacion[c]['CONTEO'] * 100)/n_formacion )
            this.dona_labels.push(this.count_formacion[c]['DESCRIPCION']);
            array_porcentaje.push(porcentaje);

        }
        this.dona_data = [{data: array_porcentaje}]
        console.log(this.dona_data);

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
        let escalafon =[]
        let grado =[]
        for (let v in this.historial_ascensos) {

            escalafon.push(parseInt(this.historial_ascensos[v]['UBICACION_ESCALAFON'])  )
            grado.push(this.historial_ascensos[v]['GRADO'])

        }
        this.labels_line = grado;
        this.data_line= [

         {data: [0, 0, 0, 0, 0], label: 'Series A'},
         {data: escalafon, label: 'Series b'},
        //  {data: [8, 8, 8, 8, 8], label: 'Series b'},
        //  {data: [12, 12, 12, 12, 12], label: 'Series b'},
        //  {data: [15, 15, 15, 15, 15], label: 'Series b'},

       ];
        console.log(this.labels_line)
        console.log(this.data_line)
        // console.log(response );
      },
      error=>{
        console.log(error)
      }
    )

  }
  pet_licencias(id){
    this._peticiones.getLicencias(id).subscribe(
      response=>{
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    );
  }

}
