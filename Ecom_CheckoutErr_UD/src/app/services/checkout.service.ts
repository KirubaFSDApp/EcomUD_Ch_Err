import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';
import { PurchaseResponse } from '../common/PurchaseResponse';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = 'http://localhost:9090/api/checkout/purchase';

  constructor(private httpClient:HttpClient) { }

  placeOrder(purchase:Purchase): Observable<PurchaseResponse>
  {
    console.log(purchase);
    
    return this.httpClient.post<PurchaseResponse>(this.purchaseUrl, purchase)
  }
}
