import { Component } from '@angular/core';

@Component({
  selector: 'error',
  templateUrl: '../../views/error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  public titulo:string;
  constructor(){
    this.titulo = 'Error';
  }

  ngOnInit(){
    console.log('error cargado correctamente');
  }

}
