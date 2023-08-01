import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  url:any;
  activecom:string = 'product';
  activepro:string;
  onCclick(){
    this.activecom = 'company';
    this.activepro = '';
  }
  onPclick(){
    this.activepro = 'product'
    this.activecom ='';
  }
  title = 'Angular Client For Spring Boot';
}
