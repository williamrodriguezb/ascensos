import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'inicio',
  templateUrl: '../../views/inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  public titulo:string;
  constructor(
    private _router:Router
  ){
    this.titulo = 'Inicio'
  }

  ngOnInit(){
    if(localStorage.getItem('token')){
      this._router.navigate(['/calificacion']);
    }
  }

}
