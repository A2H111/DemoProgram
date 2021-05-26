import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable, ObservedValueOf } from 'rxjs';
import { IProduct } from '../interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class ProductDataHttpService {

  public readonly apibaseurl = "http://localhost:58988/api/Products";
  
  constructor(private _httpClient:HttpClient) { }

  getProductData(): Observable<IProduct[]>
  {
      return this._httpClient.get<any>(this.apibaseurl+"/GetProductsDetails");
  }

  getProductDataByProductName(searchText:any): Observable<IProduct[]>
  {
      return this._httpClient.get<any>(this.apibaseurl +"/GetProductDetailsByProductName?searchParam=" + searchText);
  }

  insertProductData(productRecord: IProduct) {
    const headersData = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    };
    return this._httpClient.post<any>(this.apibaseurl+"/InsertProductsDetails", JSON.stringify(productRecord), headersData );
  }

  updateProductData(productRecord: IProduct) {
    const headersData = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    };
     return this._httpClient.put<any>(this.apibaseurl+"/UpdateProductsDetails", JSON.stringify(productRecord), headersData );
  }

  deleteProductsDetails(productIds: IProduct[]) {
    const headersData = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    };
     return this._httpClient.post<any>(this.apibaseurl+"/DeleteProductsDetails",productIds );
  }


  
}
