import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../User';
import { UserService } from '../user.service';
import { ImageLoader } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  eror:any;
  hide = true;
  formValue: FormGroup;
  islogged : boolean = false;

  img:string = "../productimg/download.png";
  user: User = new User(0,"","");
  constructor(private formbuilder:FormBuilder, private service:UserService,
    private router: Router) { }

  vaildatelogin(){
    this.user.email = this.formValue.value.email;
    this.user.pass = this.formValue.value.password;

    let resp = this.service.findUser(this.user);
    resp.subscribe(data=>{
   alert("Welcome! "+ this.user.email + " You Logged in Successfully!!");
   sessionStorage.setItem('username', this.user.email);
  this.islogged = true;
  this.router.navigate(['/products']) }
  
  ,error=>alert("Invalid Username or Password"))
  }

  adduser(){
    this.user.email = this.formValue.value.email;
    this.user.pass = this.formValue.value.password;

    let resp = this.service.addUser(this.user);
    resp.subscribe(data=>{
      alert("Added successfully!"); })
    
  }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({

      email:[''],
      password:['']

    })
    if(sessionStorage.getItem('username')){
      
      this.router.navigate(['/products']) 
    }
  }

}
