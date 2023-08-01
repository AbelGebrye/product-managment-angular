import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ProductRegistraionService } from '../product-registraion.service';
import { Location, NgIf } from '@angular/common'; 
import { FormBuilder,FormGroup } from '@angular/forms';
import { Product } from '../product';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
@Component({
  selector: 'app-serach-delete',
  templateUrl: './search-delete.component.html',
  styleUrls: ['./search-delete.component.css']
})
export class SerachDeleteComponent implements OnInit {

  products:Product[];
  id:String;
  product: Product=new Product(0,"","",0);
  formValue : FormGroup;

  showAdd:boolean;
  showUpdate:boolean;

  search:string;

  user:any;

  public listData = new MatTableDataSource<Product>();
  changeCount:number = 0; 

  key:String;
  
  
  displayedColumns: string[] = ['Id', 'Productname', 'Quantitiy', 'Price','Actions'];
 
  constructor(private service:ProductRegistraionService,private location: Location,
    private formbuilder:FormBuilder,
    private router:Router) { }

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.listData.sort = this.sort;
  }

    public getProduct(){
      this.service.getProducts().subscribe((res)=>{
        this.listData.data = res;
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      })
     }
public onDelete(id:any)
{
  this.product.id = id;
}

applyFilter(){
  this.listData.filter = this.key.trim().toLocaleLowerCase();
}
clearFilter(){ 
  this.key = "";
  this.applyFilter();
 
}
 
public deleteProduct(){
    
       let resp= this.service.deleteProduct(this.product.id);
       resp.subscribe(res=>{
       alert("Product Deleted Successfully!"),
       this.getProduct();
          })
     let ref = document.getElementById('canceldelete');
        ref?.click();
       this.formValue.reset();
 }

 public editProduct(list:any){

  this.showAdd = false;
  this.showUpdate = true;
  this.formValue.controls['name'].setValue(list.name);
  this.formValue.controls['qty'].setValue(list.qty);
  this.formValue.controls['price'].setValue(list.price);
  this.product.id = list.id;
 }

 public addClick(){
  this.formValue.reset();
  this.showAdd = true;
  this.showUpdate = false;
 }

   public addProduct(){
      
      this.product.name = this.formValue.value.name;
      this.product.qty = this.formValue.value.qty;
      this.product.price = this.formValue.value.price;

    if(this.changeCount	<3){
        alert("Please Fill out All Fields!");
      }
    else
    {
      let resp =  this.service.doRegistration(this.product)

      resp.subscribe(res=>{ alert("Product Added Successfully!"), this.getProduct();})

     let ref = document.getElementById('cancel');
     ref?.click();

    this.formValue.reset();
    this.changeCount = 0;
    }
   }


public findProductByname(){
 
 if(this.formValue.value.search){
  this.service.findProductyName(this.formValue.value.search).subscribe((res)=>{
    this.listData.data = res;})
  }
  else
  this.getProduct();
 }
 
 logout(){
  sessionStorage.removeItem("username");
  this.router.navigate(['/login']);
 }


 public updateProduct(){
  

  if(this.changeCount <1){
alert("You didn't Updated anything!");
  }
  else
  {
      this.product.name = this.formValue.value.name;
      this.product.qty = this.formValue.value.qty;
      this.product.price = this.formValue.value.price;
      let resp=this.service.updateProduct(this.product);

      resp.subscribe(res=>{alert("Product Updated Successfully!"),this.getProduct();})

      let ref = document.getElementById('cancel');
      ref?.click();
     this.formValue.reset();
      }

  
 }

  ngOnInit() :void{

    this.formValue = this.formbuilder.group({

      name:[''],
      qty:[''],
      price:[''],
      search:['']

    })

    this.user = sessionStorage.getItem('username');
    if(this.user==null){
      alert("Access Denied!! You are not Logged In")
      this.router.navigate(['/login'])
  }

    this.getProduct();
    
  
  }

}
