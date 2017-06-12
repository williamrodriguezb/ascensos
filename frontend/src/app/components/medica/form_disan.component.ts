import { Component, Input } from '@angular/core';
import { formDisanM} from '../../models/formDisan';

@Component({
  selector: 'formDisan',
  templateUrl: '../../views/medica/formDisan/formDisan.component.html',
  styleUrls: ['../../views/medica/formDisan/formDisan.component.css']
})
export class FormDisanComponent {
  @Input() seccion;
  public datos:formDisanM;
  public model;

  constructor(){
    this.datos = new formDisanM('','',0,'','',0,'');
  }
  ngOnInit(){
    console.log('medica cargado correctamente');
  }
  onSubmit(){
    console.log(this.datos)
  }
  updatedcl(valor){
    this.datos.dcl = valor
  }

}
