import { Component, Input } from '@angular/core';
import { ListadoAscenso } from '../../models/listado';
import { peticionesService} from '../../services/peticiones.service'
import {NgbPagination,NgbPaginationConfig,NgbProgressbar, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'propuestos',
  templateUrl: '../../views/calificacion/propuestos/propuestos.component.html',
  styleUrls: ['../../views/calificacion/propuestos/propuestos.component.css'],
  providers:[peticionesService,NgbPagination,NgbPaginationConfig,NgbProgressbar, NgbProgressbarConfig]
})
export class PropuestosComponent {

  @Input() direccion;
  @Input() destino;

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
            this.listadoResultado = response;
            this.loading = 'hide';
            console.log(this.listadoResultado);
          },
          error=>{
            console.log(error);
          }
        );
    }
    limpiar(){
      this.listadoResultado=null;
      this.listado = new ListadoAscenso('','',null,1);
    }
    cambiaPage(page){
      this.listado.page=page;
    }
    displayForm(estado){
      this.ver_form=estado;
    }
}
