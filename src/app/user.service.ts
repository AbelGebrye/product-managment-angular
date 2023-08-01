import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public findUser(user: any):Observable<Object>{
    return this.http.post("http://localhost:9091/login/", user);
  }
  public addUser(user:User){
    return this.http.post("http://localhost:9091/login", user);
  }
  public getacess(){
    return this.http.get("http://localhost:9192/");
  }
  public getlogin(user: any):Observable<Object>{
    return this.http.post("http://localhost:9192/authenticate", user);
  }
}