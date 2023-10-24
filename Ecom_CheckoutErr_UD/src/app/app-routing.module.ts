import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  
  {path:'search/:search', component:ProductListComponent},
  {path:'category/:id', component:ProductListComponent},
  {path:'category', component:ProductListComponent},
  {path:'products', component:ProductListComponent},
  
  {path:'products/:id', component:ProductDetailsComponent},
  
  {path:'cartitems', component:CartItemsComponent},
  
  {path:'checkout', component:CheckoutComponent},

  {path:'', redirectTo:'/products', pathMatch:'full'},
  {path:'**', redirectTo:'/products', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
