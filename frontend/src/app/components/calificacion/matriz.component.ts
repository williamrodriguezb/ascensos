import { Component } from '@angular/core';
import { peticionesService } from '../../services/peticiones.service'

@Component({
  selector: 'hojaPersona',
  templateUrl: '../../views/calificacion/matriz/matriz.component.html',
  styleUrls: ['../../views/calificacion/matriz/matriz.component.css'],
  providers:[ peticionesService]
})
export class MatrizComponent  {
  public panelSeleccionado;
  
  constructor(private _peticiones:peticionesService){
      // this.panelSeleccionado = '';
  }
  ngOnInit(){

  }
  panel(n){
      this.panelSeleccionado = n;
  }
}
