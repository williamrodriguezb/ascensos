import { Component} from '@angular/core';
import { loginService } from '../../services/login.service' ;

@Component({
  selector:'logout',
  providers:[loginService],
  template: ''
})

export class LogoutComponent{

  constructor(private _loginService: loginService){}
  ngOnInit(){
      this._loginService.logout();
  }
}
