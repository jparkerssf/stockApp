import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'; 
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {StockServiceService} from './stock-service.service'
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
     HttpClientModule,
    HttpModule,
     ChartsModule

  ],
  providers: [StockServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
