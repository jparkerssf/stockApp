//   stockQuery(query){
//                  console.log(this.lineChartData[0].data,"check graph data" )
//           this.savedStocks.data = [];
                    

//         console.log("query type",query);
//          this.stockService.searchStock(query)
//      .subscribe(
//         (data) => {
//             console.log("query data", data);
//             let dataObject = data["Monthly Time Series"]
            
//                 // for (var key in dataObject) {
//                 //     this.lineChartLabels.push(key);

//                 // }
//                 console.log(dataObject,"dataObject")
//                 for(var key in dataObject){
//                   if(dataObject.hasOwnProperty(key)){
//                     let stockObject = dataObject[key];
//                         this.savedStocks.data.push(stockObject["2. high"]);
//                   }
//                 }
               
               
//                 this.lineChartData.push(this.savedStocks);
//                 console.log("line chart data", this.lineChartData)
                
//              this.chart.chart.update();
//         // this.lineChartData[0]=this.savedStocks

//         },
//         (error)=>{
           
//           console.log("error",error);
           
//         }
         
         
         
//       )
   
     
     

//   }
  
  