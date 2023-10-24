import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(cartItem: CartItem)
  {
    //check if we have already have item in our cart
    let alreadyExistInCart:boolean = false;
    let existingCartItem:CartItem = undefined!;

    if(this.cartItems.length > 0){
      //find the item in cart by id
      existingCartItem = this.cartItems.find(temp=> temp.id == cartItem.id)!;
      // for (const temp of this.cartItems) {
      //   if(temp.id == cartItem.id)
      //   {
      //     existingCartItem = temp;
      //     break;
      //   }
      // }
    }
    alreadyExistInCart = (existingCartItem!=undefined);

    if(alreadyExistInCart)
    {
      existingCartItem.quantity++;
    }
    else
    {
      this.cartItems.push(cartItem);
      console.log('cart Items....'+cartItem);
      
    }
    console.log(this.cartItems);
    
    //compute cart total price
    this.computeCartTotal();
  }

  computeCartTotal() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    //console.log('welcome');
    
    for(let currentCartItem of this.cartItems)
    {
      totalPriceValue += currentCartItem.unitPrice * currentCartItem.quantity;
      //console.log('Added Item: '+currentCartItem.name);
      totalQuantityValue += currentCartItem.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    
    //console.log(totalPriceValue);
    //console.log(totalQuantityValue);
    
  }

  removeItemFromCart(tempCartItem:CartItem)
  {
    const index = this.cartItems.findIndex(temp=>tempCartItem.id==temp.id);
    if(index > -1)
      this.cartItems.splice(index,1);
    this.computeCartTotal();
  }
}
