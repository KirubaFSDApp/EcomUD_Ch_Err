import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cartdetails',
  templateUrl: './cartdetails.component.html',
  styleUrls: ['./cartdetails.component.css']
})
export class CartdetailsComponent implements OnInit{

  totalPrice:number=0;
  totalQuantity:number=0;
  constructor(private cartService:CartService){
    
  }
  ngOnInit(): void {
    this.cartService.totalPrice.subscribe((data)=>this.totalPrice=data)
    this.cartService.totalQuantity.subscribe((data)=>this.totalQuantity=data)
  }
}
