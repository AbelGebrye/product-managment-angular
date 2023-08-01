import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from './company';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }


  public doRegistration(company: Company){
    return this.http.post("http://localhost:9091/addcompany",company,{responseType:'html' as 'json'});
  }

  public getCompanys():Observable<Company[]> {
    return this.http.get<Company[]>("http://localhost:9091/findcompanys");
  }

  public findCompanyById(name:String):Observable<Company[]> {
    return this.http.get<Company[]>("http://localhost:9091/findcompanys/"+name);
  }

  public deleteCompany(id: any){
    return this.http.delete("http://localhost:9091/deletecompany/"+id);
  
    
  }
  public updateCompany(company: Company){
    return this.http.put("http://localhost:9091/updatecompany/",company,{responseType:'text' as 'json'});
  }
  
}
