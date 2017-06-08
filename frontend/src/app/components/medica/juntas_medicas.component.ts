import { Component, Input } from '@angular/core';

@Component({
  selector: 'juntasMedicas',
  templateUrl: '../../views/medica/juntas_medicas/juntas_medicas.component.html',
  styleUrls: ['../../views/medica/juntas_medicas/juntas_medicas.component.css']
})
export class JuntasMedicasComponent {
  @Input() titulo  ;

  ngOnInit(){
    if(!this.titulo){
        this.titulo = 'Juntas Medicas';
        console.log(this.titulo)
    }
    console.log('medica cargado correctamente');
  }

}
