import { Component } from '@angular/core';

@Component({
  selector: 'juntasmedicas',
  templateUrl: '../../views/medica/juntas_medicas/juntas_medicas.component.html',
  styleUrls: ['../../views/medica/juntas_medicas/juntas_medicas.component.css']
})
export class JuntasMedicasComponent {
  ngOnInit(){
    console.log('medica cargado correctamente');
  }

}
