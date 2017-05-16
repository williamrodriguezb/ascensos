import { Component } from '@angular/core';
import { peticionesService } from '../../services/peticiones.service'

@Component({
  selector: 'hojaPersona',
  templateUrl: '../../views/calificacion/hoja_persona/hoja_persona.component.html',
  styleUrls: ['../../views/calificacion/hoja_persona/hoja_persona.component.css'],
  providers:[ peticionesService]
})

export class HojaPersonaComponent  {
  public persona;
  constructor(private _peticiones:peticionesService){

  }
  ngOnInit(){
    this._peticiones.persona().subscribe(
      response=>{
        this.persona = response;
        console.log(response);
      },
      error=>{}
    );

  }
}
