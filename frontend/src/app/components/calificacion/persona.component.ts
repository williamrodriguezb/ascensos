import { Component } from '@angular/core';
import { ConsultaPersona} from '../../models/consulta_persona';
import { peticionesService } from '../../services/peticiones.service'

@Component({
  selector: 'persona',
  templateUrl: '../../views/calificacion/persona/persona.component.html',
  styleUrls: ['../../views/calificacion/persona/persona.component.css'],
  providers:[ peticionesService]
})

export class PersonaComponent{
  public consultaPersona = new ConsultaPersona('','','','');
  public resulBusqueda;
  constructor(private _peticiones:peticionesService){}

  ngOnInit(){
  }
  onSubmit(){
    this._peticiones.listado_consultaPersona(this.consultaPersona)
    .subscribe(
      response=>{
        this.resulBusqueda= response;
        console.log(response);
      },
      error=>{
        console.log(error);
      }
    );
  }

  limpiar(){
    this.resulBusqueda = null;
    this.consultaPersona = new ConsultaPersona('','','','');
  }
}
