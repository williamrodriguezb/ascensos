import { Component } from '@angular/core';
import { ListadoAscenso } from '../../models/listado';
import { peticionesService} from '../../services/peticiones.service'
import {NgbPagination,NgbPaginationConfig,NgbProgressbar, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'listado',
  templateUrl: '../../views/calificacion/listado/listado.component.html',
  styleUrls: ['../../views/calificacion/listado/listado.component.css'],
  providers:[peticionesService,NgbPagination,NgbPaginationConfig,NgbProgressbar, NgbProgressbarConfig]
})

export class ListadoComponent {

  public listado:ListadoAscenso;
  public listadoResultado;
  public listadoPage;
  public listadoItemsPage;
  public listadoTotalPage;
  public loading ;
  public ver_form;
  public page:number;
  constructor(private _peticiones:peticionesService){
    this.loading = 'hide';
    this.ver_form = 'ver';
    this.page = 1;
  }
    ngOnInit(){
      this.listado = new ListadoAscenso('','',null,1)
    }
    onSubmit(){
      this.loading = 'show';
      this.ver_form='hide';
        this._peticiones.listado(this.listado, this.listado.page).subscribe(
          response=>{
            // this.listadoResultado = JSON.stringify(response);
            this.listadoResultado = response;
            // this.listadoPage = response['pagina'];
            // this.listadoItemsPage = response['items_page'];
            // this.listadoTotalPage = response['total_page'];
            this.loading = 'hide';

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

    cambiaPage(page){
      this.listado.page=page;
    }
    displayForm(estado){
      this.ver_form=estado;
    }


}
