import { Injectable } from '@angular/core';
import { Http , Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { GLOBAL } from './global';

@Injectable()

export class loginService{
  public url = GLOBAL.url;
  public identity;
  public token;
  constructor(
    private _http:Http,
    private _route:Router
  ){
  }
  signUp(user){
    ;

    let params= "username="+user.username+"&password="+user.password+"&hash="+user.hash;
    let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
       return this._http.post(this.url+'login/ldap',params, {headers: headers})
      .map(res => res.json());
      //  return this._http.post(url, "apellidos=RODRIGUEZ%&categoria=OFIC"  ,{headers: headers})
            //  .map(res => res.json());
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity != 'undefined' || identity){
      this.identity = this.identity;
      // console.log(this.identity);
    }else{
      this.identity = null;
    }
    return this.identity =  identity;
  }
  getToken(){
    let token = localStorage.getItem('token');
    if(token != 'undefined' || token != null){
      this.token = token;
    }else{
      this.token = null;
    }
    return this.token =token;
  }
  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');


    this._http.get(this.url+'login/logout');
    // this._route.navigate(['inicio']);
    this.token =null;
    this.identity =null;
    window.location.href='/';

  }
}
