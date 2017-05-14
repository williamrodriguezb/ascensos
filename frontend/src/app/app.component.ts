import { Component } from '@angular/core';
import { UsuarioService } from './services/usuarios.service';
import { GLOBAL } from './services/global';
import { Usuario } from './models/usuario';
import {  Router, ActivatedRoute, Params} from '@angular/router';
import { loginService } from './services/login.service' ;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UsuarioService, loginService]
})
export class AppComponent {
  public identidad;
  public token;


  constructor(
  		private _UsuarioService:UsuarioService,
      private _loginService:loginService
	){
  	}
  	ngOnInit(){
      this.identidad = this._loginService.getIdentity();
      this.token = this._loginService.getToken();
  	}
}
