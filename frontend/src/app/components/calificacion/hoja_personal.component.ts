import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { peticionesService } from '../../services/peticiones.service';

@Component({
  selector: 'hojaPersona',
  templateUrl: '../../views/calificacion/hoja_persona/hoja_persona.component.html',
  styleUrls: ['../../views/calificacion/hoja_persona/hoja_persona.component.css'],
  providers:[ peticionesService]
})

export class HojaPersonaComponent  {
  public persona;
  public parametro;
  public tiempos;
  public folios;
  public sanciones;
  public formacion;
  public perfil;
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

  constructor(
    private _peticiones:peticionesService,
    private _router:Router,
    private _route: ActivatedRoute,
  ){
    this.pop = 'oculta'
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
        this.tiempos = response;
        console.log(Object.keys(this.tiempos).length);
      },
      error=>{}
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



}
