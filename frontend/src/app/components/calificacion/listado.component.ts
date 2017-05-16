import { Component } from '@angular/core';
import { ListadoAscenso } from '../../models/listado';
import { peticionesService} from '../../services/peticiones.service'

@Component({
  selector: 'listado',
  templateUrl: '../../views/calificacion/listado/listado.component.html',
  styleUrls: ['../../views/calificacion/listado/listado.component.css'],
  providers:[peticionesService]
})

export class ListadoComponent {
  constructor(private _peticiones:peticionesService){}
    public listado:ListadoAscenso;
    public listadoResultado;


    ngOnInit(){
      this.listado = new ListadoAscenso('','',null)
    }
    onSubmit(){
        this._peticiones.listado(this.listado).subscribe(
          response=>{
            // this.listadoResultado = JSON.stringify(response);
            this.listadoResultado = response;
            console.log(this.listadoResultado);
            // this.listadoResultado = JSON.parse(this.listadoResultado);
          },
          error=>{
            console.log(error);
          }
        );
    }
    limpiar(){
      this.listadoResultado=null;
    }

}
