import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/productCategory';
import { CartService } from 'src/app/services/cart.service';
import { DataShareService } from 'src/app/services/data-share.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[] = [];
  currentCategoryId: any = 1;
  previousCategoryId: any = 1;
  searchMode: boolean = false;

  searchKey: any = '';

  //pagination properties
  pageNumber: number = 0;
  pageSize: number = 4;
  totalElements: number = 0;

  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private cartService:CartService,
    public dataShareService: DataShareService) {

  }
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(() => {
      this.getAllProduct();
    })

    this.productList.forEach(prod => console.log(prod));
  }

  public getAllProduct() {
    this.searchMode = this.activatedRoute.snapshot.paramMap.has('search');
    if (this.searchMode) {
      this.handleSearchProduct();
    }
    else {
      this.handleGetllProduct();
    }
  }

  handleGetllProduct() {
    //const prodList = new Subject<Product[]>();
    const hasCategoryId: boolean = this.activatedRoute.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = this.activatedRoute.snapshot.paramMap.get('id');
      console.log(this.currentCategoryId);

      this.productService.getProductListBycategorid(this.currentCategoryId).subscribe(
        (data) => {this.productList = data;console.log(data);
        }//prodList.next(data);}
      );
    }
    else {
      this.productService.getProductList().subscribe(
        (data) => {this.productList = data;console.log(data);}
      );
    }
  }

  handleSearchProduct() {
    //this.searchKey = this.activatedRoute.snapshot.paramMap.get('search');
    this.productService.getProductListBySearch().subscribe(
      (data) => this.productList = data
    );
  }

  addToCart(prod:Product)
  {
    //console.log(prod.name+' '+prod.unitPrice);
    const cartItem = new CartItem(prod);
    this.cartService.addToCart(cartItem);
  }

  handleGetProductWithPaginate() {
    if(this.previousCategoryId != this.currentCategoryId){
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListByCategoryidPaginate(this.pageNumber-1, this.pageSize, this.currentCategoryId)
                                                           .subscribe((data)=>{
                                                            this.productList = data.products;
                                                            this.pageNumber = data.page.pageNumber+1;
                                                            this.pageSize = data.page.pageSize;
                                                            this.totalElements = data.page.totalElements;
                                                           });


  }
}
