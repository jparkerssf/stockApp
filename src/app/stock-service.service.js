"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
var StockServiceService = (function () {
    function StockServiceService(http) {
        this.http = http;
        this.newsUrl = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=e9e5e1c20237468cbe71302a56521556";
        this.url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=MSFT&apikey=TA0MFSEH1N40C4ZO';
        this.searchUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=';
    }
    StockServiceService.prototype.getStock = function () {
        return this.http.get(this.url)
            .map(function (response) {
            var stockData = response.json();
            return stockData;
        });
    };
    StockServiceService.prototype.searchStock = function (query) {
        return this.http.get(this.searchUrl + query + '&apikey=TA0MFSEH1N40C4ZO')
            .map(function (response) {
            var stockQueryData = response.json();
            return stockQueryData;
        });
    };
    StockServiceService.prototype.getNews = function () {
        return this.http.get(this.newsUrl)
            .map(function (response) {
            var news = response.json();
            return news;
        });
    };
    StockServiceService = __decorate([
        core_1.Injectable()
    ], StockServiceService);
    return StockServiceService;
}());
exports.StockServiceService = StockServiceService;
