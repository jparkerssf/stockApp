import { Injectable } from '@angular/core';
import { Http ,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
@Injectable()
export class StockServiceService {
    newsUrl:string =  "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=e9e5e1c20237468cbe71302a56521556";
    dailyUrl:string = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=15min&outputsize=full&apikey=demo"
    url:string = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&apikey=TA0MFSEH1N40C4ZO'
    searchUrl:string = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol='
    smaUrl :string = "https://www.alphavantage.co/query?function=SMA&symbol=MSFT&interval=15min&time_period=10&series_type=close&apikey=TA0MFSEH1N40C4ZO"
    searchSma :string = "https://www.alphavantage.co/query?function=SMA&symbol=" 
    searchSma2:string = "&interval=15min&time_period=10&series_type=close&apikey=TA0MFSEH1N40C4ZO"


  constructor(public http: Http) { }
  
  getStock(){
      return this.http.get(this.dailyUrl)
      .map(
          (response:Response)=>{
          
           const stockData = response.json();
          return stockData;
          
      })
      
      
  }
  
    
  searchStock(query){
      return this.http.get(this.searchUrl + query + '&apikey=TA0MFSEH1N40C4ZO')
      .map(
          (response:Response)=>{
          
           const stockQueryData = response.json();
          return stockQueryData;
          
      })
      
      
  }
  getNews() {
      return this.http.get(this.newsUrl)
      .map(
          (response:Response) => {
          
          const news = response.json();
          return news;
          
      }
      )
      
      
  }
  //  getSma(stockSymbol) {
  //     return this.http.get(this.searchSma + stockSymbol + this.searchSma2)
  //     .map(
  //         (response:Response) => {
          
  //         const smaData = response.json();
  //         return smaData;
          
  //     }
  //     )
      
      
  // }
  smaSearch() {
      return this.http.get(this.smaUrl)
      .map(
          (response:Response) => {
          
          const smaData = response.json();
          return smaData;
          
      }
      )
      
      
  }
  
  
  
 
  
  
  

}
