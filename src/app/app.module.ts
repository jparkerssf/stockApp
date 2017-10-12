import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'; 
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {StockServiceService} from './stock-service.service'
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { BrowserAnimationsModule }from'@angular/platform-browser/animations';
import { UserService } from './user.service';

/* Below material imports go here, note if you have the newest version they will start
with Mat instead of Md, for example   MdButtonModule would be MatButtonModule
*/
import {MdToolbarModule, 
  MdButtonModule,
  MdFormFieldModule, 
  MdInputModule, 
  MdCardModule,
  MD_PLACEHOLDER_GLOBAL_OPTIONS
  }  from '@angular/material';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent

  ],
  imports: [
    BrowserModule,
     HttpClientModule,
    FormsModule,
    MdInputModule,
    MdFormFieldModule,
    ReactiveFormsModule,
     BrowserAnimationsModule,
    HttpModule,
    MdToolbarModule,
    MdFormFieldModule,
    MdCardModule,
    MdButtonModule,
     ChartsModule,RouterModule.forRoot([
   /*We define our routes here. The empty string below, in path "" is our base endpoint with nothing in it.
   Below is the component view that will load when the route changes. Remember in our app.component.html 
   <router-link></router-link> this is where those component's html is loaded to build our new view when the
   route changes. */
     {
       path: '',
       component: LoginComponent
       //https://material-routes-forms.stackblitz.io
     },
     {
       path: 'register',
       component: RegisterComponent
       //https://material-routes-forms.stackblitz.io/register
     },
      {
       path: 'main',
       component: MainComponent
       //https://material-routes-forms.stackblitz.io/lobby
     }

 ])

  ],
  



  providers: [StockServiceService,UserService, {provide: MD_PLACEHOLDER_GLOBAL_OPTIONS, useValue: {float: 'auto'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
