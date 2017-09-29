import { Component } from '@angular/core';
import {StockServiceService} from './stock-service.service'
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private stockService: StockServiceService){}
  //ends the constructor

  
  public lineChartData:Array <any> = [
    {data: [], label: 'Series A' }
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  lastRefreshed:string;
  timeZone:string;
  stockSymbol:string;
  
  ngAfterViewInit() {

    this.stockService.getStock()
    .subscribe(
        (data) => {
            console.log("data", data);
            this.lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
            this.timeZone = data["Meta Data"]["4. Time Zone"];
            this.stockSymbol = data ["Meta Data"]["2. Symbol"]
            console.log("monthly time series", data["Monthly Time Series"])
            let dataObject = data["Monthly Time Series"]
            
                for (var key in dataObject) {
                    this.lineChartLabels.push(key);

                }
                console.log(dataObject,"dataObject")
                for(var key in dataObject){
                  if(dataObject.hasOwnProperty(key)){
                    let stockObject = dataObject[key];
                        this.lineChartData[0].data.push(stockObject["2. high"]);
                  }
                }
                console.log(this.lineChartData,"line chart data");
               
        },
        (error)=>{
           
          console.log("error",error);
           
        }
         
         
         
      )
   
   
   
    
   
     
   
  }///ends on init function
  
  
  
  
  
  
  
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgb(73,216,230)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
 
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  
  
  ///the result from searching the stock api
   stockQuery(query){
     
        console.log("query type",query);
         this.stockService.searchStock(query)
           .subscribe(
        (data) => {
            console.log("query data", data);
            this.lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
            this.timeZone = data["Meta Data"]["4. Time Zone"];
            this.stockSymbol = data ["Meta Data"]["2. Symbol"]
            console.log("monthly time series", data["Monthly Time Series"])
            let dataObject = data["Monthly Time Series"]
            
                for (var key in dataObject) {
                    this.lineChartLabels.push(key);

                }
                console.log(dataObject,"dataObject")
                for(var key in dataObject){
                  if(dataObject.hasOwnProperty(key)){
                    let stockObject = dataObject[key];
                        this.lineChartData[0].data.push(stockObject["2. high"]);
                  }
                }
                console.log(this.lineChartData,"line chart data");
               
            
            
            
            
            
        },
        (error)=>{
           
          console.log("error",error);
           
        }
         
         
         
      )
   
     
     
     
   }
  
  
  
  
  
  
  
  
  
  
  
  
}///ends the class
