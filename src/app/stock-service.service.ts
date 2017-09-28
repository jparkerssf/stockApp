import { Injectable } from '@angular/core';
import { Http ,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
@Injectable()
export class StockServiceService {
    
    url:string = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=MSFT&apikey=TA0MFSEH1N40C4ZO'

  constructor(public http: Http) { }
  
  getStock(){
      return this.http.get(this.url)
      .map(
          (response:Response)=>{
          
           const stockData = response.json();
          return stockData;
          
      })
      
      
  }
  
  
 
  
  
  

}
