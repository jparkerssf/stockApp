import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import {StockServiceService} from './stock-service.service'

@Injectable()
export class StockResolver implements Resolve<any> {
  constructor(
    private stockService: StockServiceService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.stockService.getStock();
  }
}
