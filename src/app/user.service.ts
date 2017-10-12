import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {
  /* Variable url is the path to my server yours will have your name in front of fall 
for example     https://<studentname>-fall-2017-phortonssf.c9users.io:8080/api/AppUsers 
*/
   url: string = "http://stock-app-jadtheparker.c9users.io:8080/api/appUsers";    
  constructor(public http: Http) { }

/*Function to register our user. Takes in one paramter which is a user object and sends it
  to the url above. The login function is invoked in the register component.
*/
  register( user){
     return this.http.post( this.url, user)
        .map( res => res.json())
  }  


/*Function to login our user. Takes in one paramter which is a user object and sends it
  to the url above. The login function is invoked in the login component.
*/
   login( user ){
     console.log("hit $",user)
     return this.http.post( this.url + '/login', user)
        .map( res => res.json())
  }      
    
}


