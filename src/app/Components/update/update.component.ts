import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Parking } from 'src/app/Models/parking';
import { ParkingServiceService } from 'src/app/parking-service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  parking:Parking=new Parking();
 
  cusName:string='';
  vehicletype:string='';
  Date:string='';
  Days:string='';
  fatchdata:any;
  
    constructor(private parkingService:ParkingServiceService,private router:Router,private toastr:ToastrService,private rout:ActivatedRoute) { }
  
    ngOnInit(): void {
      this.rout.queryParams.subscribe(params =>{
        this.fatchdata=params;
      })
      if(this.fatchdata==null){
        this.router.navigate(['parking-list']);
      }
      else{
        this.parking=this.fatchdata;
       
      }
    }
    onSubmit(){
      this.parkingService.update(this.parking).subscribe(data => {
        console.log(data);
  
        if (data.message == "Validation Failed") {
          data.details.forEach(element => {
            const keys = Object.keys(element);
            const key = keys[0];
            const value = element[key];
            switch (key) {
             
              case "customerName": {
                this.cusName = value;
                break;
              }
  
              case "vehicleType": {
                this.vehicletype = value;
                break;
              }
            
              case "dateOfParking": {
                this.Date = value;
                break;
              }
              case "days": {
                this.Days = value;
                break;
              }
              default: {
                break;
              }
  
            }
  
           
          });
        }
        else {
          if (data.code == "FAILED") {
            this.toastr.error(data.message);
          }
          else {
            if (data.code == "SUCCESS") {
              this.toastr.success(data.message);
              this.router.navigate(['parking-list']);
            }
          }
        }
      })
    }
  
    name(){
      this.cusName='';
    }
    vType(){
      this.vehicletype='';
    }
    date(){
      this.Date='';
    }
    days(){
      this.Days='';
    }
    cancel(){
      this.router.navigate(['parking-list']);
    }

}
