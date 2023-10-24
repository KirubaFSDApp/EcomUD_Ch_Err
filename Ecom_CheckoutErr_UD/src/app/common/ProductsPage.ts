import { Product } from "./product";

export class ProductPage{
    constructor(public products: Product[], 
                public page: {
                    pageSize:number,
                    totalElements:number,
                    totalPages:number,
                    pageNumber:number
                })
    {

    }
}