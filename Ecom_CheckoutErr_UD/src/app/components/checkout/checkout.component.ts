import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { States } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { FormserviceService } from 'src/app/services/formservice.service';
import { CustomValidator } from 'src/app/validators/custom-validator';
import { CartdetailsComponent } from '../cartdetails/cartdetails.component';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { CartItem } from 'src/app/common/cart-item';
import { PurchaseResponse } from 'src/app/common/PurchaseResponse';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  cartDetails!:CartdetailsComponent;

  creditCardYear: number[] = [];
  creditCardMonth: number[] = [];

  countries: Country[] = [];
  billingStates: States[] = [];
  shippingStates: States[] = [];

  purchaseResponse!: PurchaseResponse;

  constructor(private formBuilder: FormBuilder,
    private formService: FormserviceService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {

  }

  ngOnInit(): void {

    this.cartService.totalPrice.subscribe((data)=>this.totalPrice=data);
    this.cartService.totalQuantity.subscribe((data)=>this.totalQuantity=data);

    this.getTotalPriceAndQuantity();
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(4),
        CustomValidator.noWhiteSpace]),
        lastName: [''],
        email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_!#$%&amp;'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")]),
        mobileNo: new FormControl('', [Validators.required, Validators.pattern('[789][0-9]{9}'),
        Validators.maxLength(10), Validators.minLength(10)])
      }),
      shippingAddr: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(4),
        CustomValidator.noWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(4),
        CustomValidator.noWhiteSpace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipcode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6),
        Validators.pattern("[0-9]{6}")])
      }),
      billingAddr: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(4),
        CustomValidator.noWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(4),
                  CustomValidator.noWhiteSpace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipcode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6),
        Validators.pattern("[0-9]{6}")])
      }),
      cardInfo: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(4),
                    CustomValidator.noWhiteSpace]),
        cardNumber: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12),
          Validators.pattern("[0-9]{12}")]),
        securityCode: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4),
          Validators.pattern("[0-9]{4}")]),
        exipryMonth: new FormControl('', [Validators.required]),
        exipryYear: new FormControl('', [Validators.required])
      })
    });

    const startMonth: number = new Date().getMonth() + 1;
    this.formService.getCreditCardMonths(startMonth).subscribe(data => this.creditCardMonth = data);
    this.formService.getCreditCardYears().subscribe(data => this.creditCardYear = data);

    this.formService.getCountries().subscribe(data => {
      console.log(JSON.stringify(data));
      this.countries = data
    });

  }

  handleMonthAndYear() {
    const creditCardFormGroup = this.checkoutFormGroup.get('cardInfo');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup?.value.exipryYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
    }

    this.formService.getCreditCardMonths(startMonth).subscribe(
      (data) => this.creditCardMonth = data);
  }

  onSubmit() {
    console.log('handling sumit button');
    
    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // setup order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity
    console.log("Order item price: "+order.totalPrice, order.totalQuantity);
    
    //get cart item
    const cartItems = this.cartService.cartItems;
    let orderItems: OrderItem[] = [];

    //creating order item from cartItems
    for(let i=0;i<cartItems.length;i++)
    {
      let orderItemTemp = new OrderItem(cartItems[i].imageUrl as string, cartItems[i].unitPrice, cartItems[i].quantity, cartItems[i].id);
      orderItems[i] = orderItemTemp;
      console.log(orderItems[i].productId,orderItems[i].quantity);
      
    }
    
    let purchase = new Purchase();
    // populate customer to puchase
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    console.log(purchase.customer.firstName);
    
    // populate shipping address to puchase
      purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddr'].value;
      console.log(purchase.shippingAddress);
      console.log(purchase.shippingAddress.country);
        
      //const shippingState:States = JSON.parse(JSON.stringify(purchase.shippingAddress.states));
      const shippingCountry:Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
      //purchase.shippingAddress.states = shippingState.name;
      purchase.shippingAddress.country = shippingCountry.name;


       // populate billing address to puchase
       purchase.billingAddress = this.checkoutFormGroup.controls['shippingAddr'].value;
       //const billingState:States = JSON.parse(JSON.stringify(purchase.billingAddress.states));
       const billingCountry:Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
       //purchase.billingAddress.states = billingState.name;
       purchase.billingAddress.country = billingCountry.name;

        purchase.order = order;
        purchase.orderItem = orderItems;
        
        for (let i=0;i<purchase.orderItem.length;i++)
        {
          console.log('Order Items '+purchase.orderItem[i].productId,purchase.orderItem[i].productId);
        }
        
        //calling rest api
        this.checkoutService.placeOrder(purchase).subscribe(
          (data) => {this.purchaseResponse = data
          /*
          next:response=>{
            alert(`Your order have placed ${response.orderTrackingNumber}`);
            //reset cart
            this.resetCart();
          },
          error:err=>{
            alert(`Error saving order${err.message}`);
          }*/
        });
  }

  resetCart(){
    //reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    //reset the form
    this.checkoutFormGroup.reset();

    //navigate to product url
    this.router.navigateByUrl("/products");
  }

  getTotalPriceAndQuantity() {
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);
  }

  getState(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(countryCode, countryName);

    this.formService.getState(countryCode).subscribe(data => {
      if (formGroupName === 'shippingAddr')
        this.shippingStates = data;
      else
        this.billingStates = data;
    });
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
  get mobileNo() { return this.checkoutFormGroup.get('customer.mobileNo'); }
  //  shippingAddr
  get street() { return this.checkoutFormGroup.get('shippingAddr.street'); }
  get city() { return this.checkoutFormGroup.get('shippingAddr.city'); }
  get state() { return this.checkoutFormGroup.get('shippingAddr.state'); }
  get country() { return this.checkoutFormGroup.get('shippingAddr.country'); }
  get zipcode() { return this.checkoutFormGroup.get('shippingAddr.zipcode'); }

  //billingAddr
  get streetb() { return this.checkoutFormGroup.get('billingAddr.street'); }
  get cityb() { return this.checkoutFormGroup.get('billingAddr.city'); }
  get stateb() { return this.checkoutFormGroup.get('billingAddr.state'); }
  get countryb() { return this.checkoutFormGroup.get('billingAddr.country'); }
  get zipcodeb() { return this.checkoutFormGroup.get('billingAddr.zipcode'); }
  
  //cardInfo      
  get cardType() { return this.checkoutFormGroup.get('cardInfo.cardType'); }
  get nameOnCard() { return this.checkoutFormGroup.get('cardInfo.nameOnCard'); }
  get cardNumber() { return this.checkoutFormGroup.get('cardInfo.cardNumber'); }
  get securityCode() { return this.checkoutFormGroup.get('cardInfo.securityCode'); }
  get exipryMonth() { return this.checkoutFormGroup.get('cardInfo.exipryMonth'); }
  get exipryYear() { return this.checkoutFormGroup.get('cardInfo.exipryYear'); }
}
