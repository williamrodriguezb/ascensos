import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router'


@Component({
  selector: 'clyso',
  templateUrl: '../../views/medica/clyso/clyso.component.html',
  styleUrls:['../../views/medica/clyso/clyso.component.css']
})

export class ClysoComponent{
  public parametro;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router
  ){}

  ngOnInit(){
    this._route.params.forEach( (params:Params)=>{
      this.parametro = params['id']
    } )
  }

}
