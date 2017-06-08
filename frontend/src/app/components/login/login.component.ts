import { Component , OnInit } from '@angular/core';
import { loginService } from '../../services/login.service' ;
import { Router , RouterModule} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: '../../views/login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [loginService]
})

export class LoginComponent  {
   public titulo:string = 'Identificate';
   public user;
   public mensajeError;
   public identity;
   public token;
   constructor(
     private _loginService: loginService,
     private _router: Router
   ){}

ngOnInit(){
  this.user = {
    'username':'',
    'password':'',
    'hash':'false'
  }

  this.identity = this._loginService.getIdentity();
  this.token = this._loginService.getToken();

  if(this.identity != null && this.identity.sub){
    this._router.navigate(['calificacion']);
  }
}

onSubmit(){
  this._loginService.signUp(this.user)
  .subscribe(
      response=>{

        if (response.status) {
            console.log(response.status);
            this.identity = response;
        }else{
              this.identity = response;
              localStorage.setItem('identity',JSON.stringify(this.identity));
              this.user.hash = "true"
              this._loginService.signUp(this.user).subscribe(
                resultado=>{
                  this.token = resultado;
                  if(this.token.lenght <= 0){
                    alert('Error en el servidor');
                  }else{
                    if(!response.status){
                      localStorage.setItem('token',this.token);
                      window.location.href="/";
                    }
                  }
                },
                error=>{
                  console.log(error);
                }
              );
              // window.location.href="/";
        }
      },
      error=>{}
  );

}
}
