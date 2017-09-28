import { Component } from '@angular/core';
import {StockServiceService} from './stock-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  
  title = 'Stock App';
  constructor(private stockService: StockServiceService){
    
    this.stockService.getStock()
    .subscribe(
         (data) => {
           
           console.log("we got some stock data",data);
           
         }
      
      
      
      )
    
    
    
    
  }

  
  
  
  
  
  
  
  
  
}
