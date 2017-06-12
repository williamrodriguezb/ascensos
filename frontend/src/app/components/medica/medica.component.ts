import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

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
