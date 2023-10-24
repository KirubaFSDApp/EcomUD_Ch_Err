import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchValue:string = '';

  constructor(private productService: ProductService, 
    private router: Router)
  {
    
  }
  public sendSearchKey()
  {
    this.productService.searchKey = this.searchValue;
    this.router.navigateByUrl(`/search/${this.searchValue}`);
    this.productService.getProductListBySearch();
  }
}
