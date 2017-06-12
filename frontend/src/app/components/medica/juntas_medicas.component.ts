import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'juntasMedicas',
  templateUrl: '../../views/medica/juntas_medicas/juntas_medicas.component.html',
  styleUrls: ['../../views/medica/juntas_medicas/juntas_medicas.component.css']
})
export class JuntasMedicasComponent {

  public parametro;
  constructor(
    private _router:Router,
    private _route:ActivatedRoute
  ){}

  ngOnInit(){

    this._route.params.forEach( (params:Params)=>{
      this.parametro = params['id'];
    } );


    console.log('medica cargado correctamente');
  }

}
