import { Component,Input } from '@angular/core';
import { ConsultaPersona} from '../../models/consulta_persona';
import { peticionesService } from '../../services/peticiones.service'
import { NgbProgressbar, NgbProgressbarConfig ,NgbPagination, NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'persona',
  templateUrl: '../../views/calificacion/persona/persona.component.html',
  styleUrls: ['../../views/calificacion/persona/persona.component.css'],
  providers:[ peticionesService, NgbProgressbar,NgbProgressbarConfig ,NgbPagination, NgbPaginationConfig]
})

export class PersonaComponent{

  @Input() url:string='';
  public consultaPersona = new ConsultaPersona('','','','');
  public resulBusqueda;
  public loading;
  public page:number;
  public ver_form;
  constructor(private _peticiones:peticionesService){
    this.loading ='hide';
    this.page = 1;
    this.ver_form = 'ver'
  }

  ngOnInit(){
    console.log(this.url);
  }
  onSubmit(){
    if(this.consultaPersona.apellidos=='' && this.consultaPersona.nombres=='' &&
    this.consultaPersona.documento=='' && this.consultaPersona.categoria==''
  ){
      console.log('apellido')
    }else{
        console.log(JSON.stringify(this.consultaPersona));
      this.ver_form = 'hide';  
      this.loading = 'show';
      this._peticiones.listado_consultaPersona(this.consultaPersona)
      .subscribe(
        response=>{
          this.resulBusqueda= response;
          this.loading = 'hide';

          console.log(response);
        },
        error=>{
          console.log(error);
        }
      );
    }

  }

  limpiar(){
    this.resulBusqueda = null;
    this.consultaPersona = new ConsultaPersona('','','','');
  }

  displayForm(estado){
    this.ver_form = estado;

  }


}
