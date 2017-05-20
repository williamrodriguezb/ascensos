import { Component } from '@angular/core';

@Component({
  selector: 'medica',
  templateUrl: '../../views/medica/medica.component.html',
  styleUrls: ['../../views/medica/medica.component.css']
})
export class MedicaComponent {
  ngOnInit(){
    console.log('medica cargado correctamente');
  }

}
