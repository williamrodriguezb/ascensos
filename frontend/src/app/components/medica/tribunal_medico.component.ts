import {Component} from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'tribunalMedico',
    templateUrl: '../../views/medica/tribunal_medico/tribunal_medico.component.html',
    styleUrls: ['../../views/medica/tribunal_medico/tribunal_medico.component.html']
})

export class TribunalMedicoComponent{
  public parametro
  constructor(
    private _router:Router,
    private _route: ActivatedRoute
  ){}

  ngOnInit(){
    this._route.params.forEach( (params:Params)=>{
      this.parametro = params['id'];
      console.log(this.parametro);

    });
  }

}
