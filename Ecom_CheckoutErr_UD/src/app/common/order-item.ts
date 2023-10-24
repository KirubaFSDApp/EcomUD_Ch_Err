import { CartItem } from "./cart-item";

export class OrderItem {
    imageUrl!:string;
    unitPrice!:number;
    quantity!:number;
    productId!:number;

    constructor(_imageUrl:string,
        _unitPrice:number,
        _quantity:number,
        _productId:number)
    {
       this.imageUrl = _imageUrl;
       this.quantity = _quantity;
       this.unitPrice = _unitPrice;
        this.productId = _productId;
    }
}