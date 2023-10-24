import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  product:any = {};
  productsArr:Product[] = [];
  constructor(private activatedRoute:ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService)
  {

  }
  ngOnInit(): void {
    const idProd:any = this.activatedRoute.snapshot.paramMap.get('id');

    this.productService.getProductById(idProd).subscribe((data)=>{this.product=data})
    console.log(this.product);
    
  }

  addToCart(product:Product)
  {
    //console.log(product.name+' '+product.unitPrice);
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
    
  }

}
