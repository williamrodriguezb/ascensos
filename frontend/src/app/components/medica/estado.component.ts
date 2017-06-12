import { Component } from '@angular/core';
import { peticionesService} from '../../services/peticiones.service'
import {Router, ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'estado',
  templateUrl: '../../views/medica/estado/estado.component.html',
  styleUrls: ['../../views/medica/estado/estado.component.css'],
  providers:[peticionesService]
})
export class EstadoComponent {
  public parametro:string
  public estadoSalud

  constructor(
    private _peticiones:peticionesService,
    private _route:ActivatedRoute,
    private _router:Router

  ){

  }
  ngOnInit(){
    this._route.params.forEach( (params:Params)=>{
      this.parametro = params['id']
      // console.log(this.parametro)
    } )

    this._peticiones.getEstadoSalud(this.parametro).subscribe(
      response=>{
        this.estadoSalud = response
        console.log(response)
      }
    )

  }

}
