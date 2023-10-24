import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit{

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity:number = 0

  constructor(private cartService:CartService)
  {

  }

  ngOnInit(): void {
    this.getCartItemsList();
    this.cartService.totalQuantity.subscribe(data=>this.totalQuantity=data);
    this.cartService.totalPrice.subscribe(data=>this.totalPrice=data);
  }
  
  getCartItemsList() {
    this.cartItems = this.cartService.cartItems;

  }
  
  changeQuantity(tempCartItem: CartItem, oper:String){
    this.cartItems.find(item=>{
      if(item.id == tempCartItem.id)
      {
        if(oper=='+')
        {
          item.quantity++;
        }
        else
          item.quantity--;
        this.cartService.computeCartTotal();
      }
    })
  }

  remove(tempCartItem:CartItem)
  {
    this.cartService.removeItemFromCart(tempCartItem);
  }
}

