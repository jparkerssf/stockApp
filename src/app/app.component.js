"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var AppComponent = (function () {
    function AppComponent(stockService) {
        this.stockService = stockService;
        //ends the constructor
        this.savedStocks = { data: [], label: '' };
        this.lineChartData = [
            { data: [], label: ' ' }
        ];
        this.lineChartLabels = [];
        this.lineChartOptions = {
            responsive: true
        };
        this.news = [];
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgb(73,216,230)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = false;
        this.lineChartType = 'line';
    }
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        ///Here we call the ny times api to get the top news article
        this.stockService.getNews()
            .subscribe(function (data) {
            console.log(data, "We got some data!");
            _this.news = data.results;
            console.log(_this.news, "here is the news!");
        }, function (error) {
            console.log(error);
        });
        this.stockService.getStock()
            .subscribe(function (data) {
            console.log(_this.lineChartData[0].data, "check graph dat");
            console.log("data", data);
            _this.lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
            _this.timeZone = data["Meta Data"]["4. Time Zone"];
            _this.stockSymbol = data["Meta Data"]["2. Symbol"];
            console.log("monthly time series", data["Monthly Time Series"]);
            var dataObject = data["Monthly Time Series"];
            for (var key in dataObject) {
                _this.lineChartLabels.push(key);
            }
            console.log(dataObject, "dataObject");
            for (var key in dataObject) {
                if (dataObject.hasOwnProperty(key)) {
                    var stockObject = dataObject[key];
                    _this.lineChartData[0].data.push(stockObject["2. high"]);
                }
            }
            console.log(_this.lineChartData, "line chart data");
        }, function (error) {
            console.log("error", error);
        });
    }; ///ends on init function
    AppComponent.prototype.randomize = function () {
        var _lineChartData = new Array(this.lineChartData.length);
        for (var i = 0; i < this.lineChartData.length; i++) {
            _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
            for (var j = 0; j < this.lineChartData[i].data.length; j++) {
                _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
            }
        }
        this.lineChartData = _lineChartData;
    };
    // events
    AppComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    AppComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    ///the result from searching the stock api
    // stockQuery(query){
    //               console.log(this.lineChartData[0].data,"check graph data" )
    //         this.lineChartData[0].data = [];
    //                     this.lineChartLabels = []
    //       console.log("query type",query);
    //       this.stockService.searchStock(query)
    //         .subscribe(
    //       (data) => {
    //           console.log("query data", data);
    //           this.lastRefreshed = data["Meta Data"]["3. Last Refreshed"];
    //           this.timeZone = data["Meta Data"]["4. Time Zone"];
    //           this.stockSymbol = data ["Meta Data"]["2. Symbol"]
    //           console.log("monthly time series", data["Monthly Time Series"])
    //           let dataObject = data["Monthly Time Series"]
    //               for (var key in dataObject) {
    //                   this.lineChartLabels.push(key);
    //               }
    //               console.log(dataObject,"dataObject")
    //               for(var key in dataObject){
    //                 if(dataObject.hasOwnProperty(key)){
    //                   let stockObject = dataObject[key];
    //                       this.lineChartData[0].data.push(stockObject["2. high"]);
    //                 }
    //               }
    //               console.log(this.lineChartData,"line chart data");
    //       },
    //       (error)=>{
    //         console.log("error",error);
    //       }
    //     )
    // }
    AppComponent.prototype.stockQuery = function (query) {
        var _this = this;
        console.log(this.lineChartData[0].data, "check graph data");
        this.savedStocks.data = [];
        console.log("query type", query);
        this.stockService.searchStock(query)
            .subscribe(function (data) {
            console.log("query data", data);
            var dataObject = data["Monthly Time Series"];
            for (var key in dataObject) {
                _this.lineChartLabels.push(key);
            }
            console.log(dataObject, "dataObject");
            for (var key in dataObject) {
                if (dataObject.hasOwnProperty(key)) {
                    var stockObject = dataObject[key];
                    _this.savedStocks.data.push(stockObject["2. high"]);
                }
            }
            _this.lineChartData.push(_this.savedStocks);
        }, function (error) {
            console.log("error", error);
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent; ///ends the class
