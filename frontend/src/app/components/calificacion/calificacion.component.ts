import { Component } from '@angular/core';
import { loginService } from '../../services/login.service' ;

@Component({
  selector: 'calificacion',
  templateUrl: '../../views/calificacion.component.html',
  styleUrls: ['./calificacion.component.css'],
  providers: [loginService]
})
export class CalificacionComponent {
 public identidad;
 public token;

  constructor(
      private _loginService:loginService
  ){}

  ngOnInit(){
    this.identidad =  this._loginService.getIdentity();
    this.token =      this._loginService.getToken();
  }
}
