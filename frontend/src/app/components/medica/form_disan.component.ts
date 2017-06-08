import { Component, Input } from '@angular/core';

@Component({
  selector: 'formDisan',
  templateUrl: '../../views/medica/formDisan/formDisan.component.html',
  styleUrls: ['../../views/medica/formDisan/formDisan.component.css']
})
export class FormDisanComponent {
  @Input() titulo  ;

  ngOnInit(){

    console.log('medica cargado correctamente');
  }

}
