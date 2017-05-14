import { Component } from '@angular/core';

@Component({
  selector: 'inicio',
  templateUrl: '../../views/inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  public titulo:string;
  constructor(){
    this.titulo = 'Inicio'
  }

  ngOnInit(){
    console.log('inicio cargado correctamente');
  }

}
