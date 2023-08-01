import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductRegistraionService {

  constructor(private http:HttpClient) { }


  
  public doRegistration(product: Product){
    return this.http.post("http://localhost:9091/addProduct",product);
  }

  public getProducts():Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:9091/findproducts");
  }

  public findProductById(id:any){
    return this.http.get("http://localhost:9091/findproductid/"+id);
  }

  public findProductyName(name:string):Observable<Product[]>{
    return this.http.get<Product[]>("http://localhost:9091/findproductname/"+name);
 
  }

  public deleteProduct(id: any){
    return this.http.delete("http://localhost:9091/delete/"+id);
  
    
  }
  public updateProduct(product: Product){
    return this.http.put("http://localhost:9091/updateProduct/",product,{responseType:'text' as 'json'});
  }
}
