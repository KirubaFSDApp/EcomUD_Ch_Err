import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { ProductCategory } from './common/productCategory';
import { DataShareService } from './services/data-share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'Ecom';
  productCategory: ProductCategory[] = [];
  searchValue:string = '';

  constructor(private productService: ProductService, 
    private dataSahreService: DataShareService)
  {
    
  }
  ngOnInit(): void {
    this.getAllCategory();
    console.log(this.productCategory);
  }
  
  public getAllCategory()
  {
    this.productService.getCategoryList().subscribe(
      (data) => this.productCategory = data
    );
  }

  public sendSearchKey()
  {
        
  }
}