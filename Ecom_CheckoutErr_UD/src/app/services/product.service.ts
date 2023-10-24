import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/productCategory';
import { ProductPage } from '../common/ProductsPage';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = 'http://localhost:9090/api/products';
  public searchKey:String = '';
  
  constructor(private httpClient: HttpClient) { }

  getProductList(): Observable<any[]>{
      
      return this.httpClient.get<any[]>(this.baseURL+'/all');
    }

    //http://localhost:9090/api/products/4
    getProductById(id:number): Observable<Product>{
      return this.httpClient.get<Product>(this.baseURL+'/'+id);
    }

    getProductListBySearch(): Observable<Product[]>{
      
      return this.httpClient.get<Product[]>(this.baseURL+'/allSearch?search='+this.searchKey)
    }  

  getProductListBycategorid(id:number): Observable<Product[]>{
    return this.httpClient.get<Product[]>('http://localhost:9090/api/products/allById/'+id)
  }

  getCategoryList():Observable<ProductCategory[]>{
    return this.httpClient.get<ProductCategory[]>('http://localhost:9090/api/productCategory/all')
  }
  //get product list with pagination
  getProductListPaginate(page:number, pageSize:number): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.baseURL+'/allwithpage?'+`pageNo=${page}&pageSize=${pageSize}`);
  }

  getProductListByCategoryidPaginate(page:number, pageSize:number, id:number): Observable<ProductPage>{
    return this.httpClient.get<ProductPage>('http://localhost:9090/api/products/allById/'+id+`?pageNo=${page}&pageSize=${pageSize}`);
  }
}
