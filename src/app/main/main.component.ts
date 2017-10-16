import { Component } from '@angular/core';
import {StockServiceService} from '../stock-service.service'
import { OnInit } from '@angular/core';

import Chart from 'chart.js';
import { ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {MdCardModule} from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent  {

  constructor(private stockService: StockServiceService){}
  //ends the constructor
    
  //savedStocks = {data:[], label:''};
  lineChartData:Array <any> = [
    {data: [], label: ' ' }
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  
  };
  todaysData= {
    open:" ",
    high: " ",
    low:" ",
    close:" "
    
  };
  smaArray:any = [];
  lastRefreshed:string;
  timeZone:string;
  stockSymbol:string;
  smaRefreshed:string
  closingData:any = []
  news:any = [];
  
  
  watchList:Array<any> = [];
 @ViewChild(BaseChartDirective)
    public chart: BaseChartDirective;
    //sample data 
  ngAfterViewInit() {
       ///Here we call the ny times api to get the top news article
    // this.stockService.getSma()
    //   .subscribe (
    //           (data) => { 
    //                   console.log(data, "We got some data!");
    //                   this.smaArray = data;
    //                   console.log(this.smaArray,"this is the sma");
    //                   console.log(" the last refreshed time", data["Meta Data"]["3: Last Refreshed"])
    //                   this.smaRefreshed = data["Meta Data"]["3: Last Refreshed"]
    //                   let smaRefreshDate = data["Meta Data"]["3: Last Refreshed"]
    //                   let smaObject = data["Technical Analyses: SMA"]
    //                   // for(var key in smaObject){
    //                   //   if(key == smaRefreshDate){
    //                   //       console.log("key", key)
    //                   //     let todaysData = smaObject[key].SMA
    //                   //   }
                         
    //                   // }
                       
    //                 //console.log("todaysData", todaysData);
    //               // return todaysData;   
                      
    //           },
    //           (error) => {
    //             console.log(error);
               
    //           }
            
    //         )
      
      
      
      
      
    this.stockService.getStock()
    .subscribe(
        (data) => {
          
          
            console.log(this.lineChartData[0].data,"check graph dat" )
            console.log("RAW DATA", data);
            this.lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
            this.timeZone = data["Meta Data"]["4. Time Zone"];
            this.stockSymbol = data ["Meta Data"]["2. Symbol"]
            console.log("monthly time series", data["Monthly Time Series"])
            let dataObject = data["Time Series (15min)"]
            
            
                for (var key in dataObject) {
                    this.lineChartLabels.push(key);
                    
                    

                }
                
                 for (var key in dataObject) {
                    this.closingData.push(dataObject[key]);
                }
                console.log(dataObject,"dataObject")
                for(var key in dataObject){
                  if(dataObject.hasOwnProperty(key)){
                   
                    
                    let stockObject = dataObject[key];
                         
                        this.lineChartData[0].data.push(stockObject["2. high"]);
                    
                  }
                }
                console.log(this.lineChartData,"line chart data");
                console.log(this.closingData,"closing data");
          
              this.todaysData.open =  this.closingData[0]["1. open"] 
              this.todaysData.high =  this.closingData[0]["2. high"] 
              this.todaysData.low =  this.closingData[0]["3. low"] 
              this.todaysData.close =  this.closingData[0]["4. close"] 
              console.log(this.todaysData,"todays data")

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
               this.todaysData= {
                    open:" ",
                    high: " ",
                    low:" ",
                    close:" "
              
            };
    
       this.closingData = []
    
         console.log(this.lineChartData[0].data,"check graph data" )
          this.lineChartData[0].data = [];
                      this.lineChartLabels = []

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
                 for (var key in dataObject) { 
                    this.closingData.push(dataObject[key]);
                }
                console.log(dataObject,"dataObject")
                for(var key in dataObject){
                  if(dataObject.hasOwnProperty(key)){
                    let stockObject = dataObject[key];
                        this.lineChartData[0].data.push(stockObject["2. high"]);
                        
                        
                  }
                }
                console.log(this.lineChartData,"line chart data");
               
                 this.todaysData.open =  this.closingData[0]["1. open"] 
                this.todaysData.high =  this.closingData[0]["2. high"] 
                this.todaysData.low =  this.closingData[0]["3. low"] 
                this.todaysData.close =  this.closingData[0]["4. close"] 
                console.log(this.todaysData,"todays data")
              
            
            
            
        },
        (error)=>{
           
          console.log("error",error);
           
        }
         
         
         
      )
   
     
     
     
  }
  
addStock(symbol){
  console.log("function triggered to add stock");
   if(!this.watchList.includes(symbol)){
           this.watchList.push(symbol);
           console.log(this.watchList,"WatchList array");
       } else{
            alert("Already in your favorites!")
       }

  console.log("my watch list ", this.watchList)
}
 
  
  
  
  
  updateView (){
    
    
              this.chart.chart.update()

    console.log("stock updated");
  }
  
  
  
  
  
  
  
  
  
  
  
 
  
  
  
  
}///ends the class
