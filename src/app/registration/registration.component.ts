import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Company } from '../company';
import { CompanyService } from '../company-service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  companys:any;
  id:String;
  company: Company=new Company(0,"","");
  formValue : FormGroup;

  showAdd:boolean;
  showUpdate:boolean;

  changeCount:number = 0; 
  
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];

  constructor(private service:CompanyService,private location: Location,
    private formbuilder:FormBuilder) { }


public onDelete(id:any)
{
  this.company.id = id;
}
 
public deleteCompany(){
    
       let resp= this.service.deleteCompany(this.company.id);
       resp.subscribe(res=>{
       alert("Compay data Deleted Successfully!"),
       this.getCompanys();
          })
     let ref = document.getElementById('canceldelete');
        ref?.click();
       this.formValue.reset();
 }

 public editCompany(list:any){

  this.showAdd = false;
  this.showUpdate = true;
  this.formValue.controls['name'].setValue(list.name);
  this.formValue.controls['desc'].setValue(list.desc);
  this.company.id = list.id;
 }

 public addClick(){
  this.formValue.reset();
  this.showAdd = true;
  this.showUpdate = false;
 }

   public addCompany(){
      
      this.company.name = this.formValue.value.name;
      this.company.descrption = this.formValue.value.desc;

    if(this.changeCount	<3){
        alert("Please Fill out All Fields!");
      }
    else
    {
      let resp =  this.service.doRegistration(this.company)

      resp.subscribe(res=>{ alert("Product Added Successfully!"), this.getCompanys();})

     let ref = document.getElementById('cancel');
     ref?.click();

    this.formValue.reset();
    this.changeCount = 0;
    }
   }


public findCompanyById(id:any){
  let resp= this.service.findCompanyById(id);
  resp.subscribe((data)=>this.companys=data);
 }

 public getCompanys(){
  let resp=this.service.getCompanys();
    resp.subscribe((data)=>this.companys=data);
 }

 public updateCompany(){
  

  if(this.changeCount <1){
alert("You didn't Updated anything!");
  }
  else
  {
      this.company.name = this.formValue.value.name;
      this.company.descrption = this.formValue.value.desc;;
      let resp=this.service.updateCompany(this.company);

      resp.subscribe(res=>{alert("Product Updated Successfully!"),this.getCompanys();})

      let ref = document.getElementById('cancel');
      ref?.click();
     this.formValue.reset();
      }

  
 }

  ngOnInit() :void{

    

    this.formValue = this.formbuilder.group({

      name:[''],
      qty:[''],
      price:['']

    })
    this.getCompanys();
  }


}
