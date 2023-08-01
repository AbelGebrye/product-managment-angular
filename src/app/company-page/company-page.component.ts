import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Company } from '../company';
import { CompanyService } from '../company-service';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css']
})
export class CompanyPageComponent implements OnInit {

  changeCount:number = 0;

  companys:any;
  showAdd:boolean;
  showUpdate:boolean;
  user:any;

  key:string;
  formValue : FormGroup;

  company: Company = new Company(0,"","");
  public listData = new MatTableDataSource<Company>();
  displayedColumn: string[] = ['Id','Companyname','Description','Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  addClick(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  applyFilter(){
    this.listData.filter = this.key.trim().toLocaleLowerCase();
  }
  findCompanyByName(){
    this.service.findCompanyById(this.formValue.value.search).subscribe((res)=>{
      this.listData.data = res;
    })
  }
  clearFilter(){
    this.key = "";
    this.applyFilter();
   
  }
  editCompany(element:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.formValue.controls['name'].setValue(element.name);
    this.formValue.controls['descrption'].setValue(element.descrption);
    this.company.id = element.id;
  }
  deleteCompany(){
    let resp= this.service.deleteCompany(this.company.id);
    resp.subscribe(res=>{
    alert("Company Deleted Successfully!"),
    this.getCompanys();
       })
  let ref = document.getElementById('canceldelete');
     ref?.click();
    this.formValue.reset();
  }

  addCompany(){


    this.company.name = this.formValue.value.name;
    this.company.descrption = this.formValue.value.descrption;
  if(this.changeCount	<2){
      alert("Please Fill out All Fields!");
    }
  else
  {
    let resp =  this.service.doRegistration(this.company)

    resp.subscribe(res=>{ alert("Company Added Successfully!"), this.getCompanys();})

   let ref = document.getElementById('cancel');
   ref?.click();

  this.formValue.reset();
  this.changeCount = 0;
  }

  }
  updateCompany(){


    if(this.changeCount <1){
      alert("You didn't Updated anything!");
        }
        else
        {
            this.company.name = this.formValue.value.name;
            this.company.descrption = this.formValue.value.descrption;
            let resp=this.service.updateCompany(this.company);

            resp.subscribe(res=>{alert("Company Updated Successfully!"),this.getCompanys();})
      
            let ref = document.getElementById('cancel');
            ref?.click();
           this.formValue.reset();
            }
      
        
  }
  logout(){
    sessionStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
  onDelete(id:any){

    this.company.id = id;
  }
  getCompanys(){
    this.service.getCompanys().subscribe((res)=>{
      this.listData.data = res;
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    })
  }
  constructor(private service:CompanyService,private formbuilder:FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    this.formValue = this.formbuilder.group({

      name:[''],
      descrption:[''],
      search:['']

    });

    
      this.user = sessionStorage.getItem('username');
      if(this.user==null){
        alert("Access Denied!! You are not Logged In");
        this.router.navigate(['/login'])
    }


    this.getCompanys();
  }
  

}
function isUserLoggedIn() {
  throw new Error('Function not implemented.');
}

