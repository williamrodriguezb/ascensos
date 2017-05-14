import { Component } from '@angular/core';
import { ListadoAscenso } from '../../../models/listado';
import { peticionesService} from '../../../services/peticiones.service'

@Component({
  selector: 'listado',
  templateUrl: '../../../views/calificacion/listado.component.html',
  styleUrls: ['./listado.component.css'],
  providers:[peticionesService]
})

export class ListadoComponent {
  constructor(private _peticiones:peticionesService){}
    public listado:ListadoAscenso


    ngOnInit(){
      this.listado = new ListadoAscenso('','',null)
    }
    onSubmit(){
        this._peticiones.listado(this.listado);
    }

}
