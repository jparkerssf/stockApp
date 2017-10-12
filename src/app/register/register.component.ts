import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: object ={}
  //returnUrl is a variable to set the route upon successful response from our server, See line 44 below
  returnUrl: string = "main"

  constructor( public user$: UserService, public router: Router ) { }
  /*
  ngOnInit is lifecycle hook that is invoked after the contstructor function above finishes building the RegisterComponent object from the class. In insde the ngOnInit function is where we would do anything we want to happend when the component or page is loaded */
  ngOnInit() {
  }

  signupForm(form){
    //If the form is not valid then alert the user.
    if(form.invalid) {
      return alert("Please fill in all of the required fields.");
    }
   else{ 

  this.user$.register(this.user )
      .subscribe(
        res => {
           /*  Anything we want to do upon a successful response from the server goes inside this first functions {}
           */
        /*check the console after registering to see what the response object returns, always a good idea to understand what we are             getting back form the server.*/
          console.log("response form login", res)
          /* 
        Save out res.token in our local storage and id this is usefull so we can use the token and id
         for http requests that require the id of the user to retrieve specific information about the user. The token
        is for authentication, granting us access and denying http requests that do not have a token. 
        To vie
        */
        window.localStorage.setItem( "token", res.id)
        window.localStorage.setItem( "id", res.id)
       
        /*
        This line will navigate us to a different view using the router, remember router-link is replaced 
        with the components html on our app.html. Routes are defined in our app.module.ts line 42. Any new routes 
        we want to add wil be created there. The variable his.returnUrl is from line 12.
        */
        this.router.navigate([this.returnUrl])
          },
         /*arrow function below to handle the case of an error from our server*/
        error => {
          /*  Any actions we need to take in the event of an error from our http request goes in here. A pop up, 
          alert, anything to communicate to the user that something went wrong is a good idea. The second arrow function 
          of subscribe is always how where we handle errors.
          .subscribe( succes => {}, error => {}, completion => {}  )
          */
          console.log("asdf", error)
        alert("Something Went Wrong Please try again")}
      )
   }
  }


  //
   loginForm(){
  
 //If the form is not valid then alert the user.
  //   if(form.invalid) {
  //     return alert("Please fill in all of the required fields.");
  //   }
  //  else{ 
    /*
    Using the variable we created above in the constructor, public user$: UserService, we can now
    access the UserServices methods and properties. Inside the function login we are passing the
    in the user object we created above. This User objects properties are added from ngModel on 
    the app.component.html you will see [(ngModel)]="user.password", this will add the property 
    password to the user object on the app.component.ts and the value of the password property 
    will be set to what the user input was. [(ngModel)] is a two way binding, meaning data can 
    be sent from both the view and our component's ts file.
                ---Two way binding---
     html <-------- data changes --------> component.ts
     Whenever the html is updated from user input that data is sent to the component.ts and visa versa.
    */
    this.user$.login( this.user )
    //Because we always subscribe to our http calls.
      .subscribe(
        res => {
          
         /*  
         Anything we want to do upon a successful response from the server goes inside this first 
         functions {}. Our response from the server invclude a few things, a token and an id. 
         Save our res.token in our local storage and id this is usefull so we
         can use the token and id for http requests that require the id of the user to 
         retrieve specific information about the user. The token is for authentication, 
         granting us access and denying http requests that do not have a token. 
         To view your local storage in chrome  dev tools go to application tab and then select local
         storage. You should see these items in there.
        */
        window.localStorage.setItem( "token", res.token)
        window.localStorage.setItem( "id", res.id)
       
        /*This line will navigate us to a different view using the router, remember router-link is replaced 
        with the components html on our app.html. To see routes and their related components view the 
        app.module and the router module below. To see what the variable this.returnUrl see line 13 above 
        */
        //this.router.navigate([this.returnUrl])
          
          },
        /*arrow function below to handle the case of an error from our server*/
        error => {
          /*  what do on error code goes in here. A pop up, alert anything
          to communicate to the user that something went wrong.
          */
          console.log(error)
        alert("Something Went Wrong Please try again")}
    )}



}