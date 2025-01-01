import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Parking } from 'src/app/Models/parking';
import { ParkingServiceService } from 'src/app/parking-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
parking:Parking=new Parking();
bookId:string='';
VNo:string='';
phoneNumber:string='';
cusName:string='';
vehicletype:string='';
Date:string='';
Days:string='';

  constructor(private parkingService:ParkingServiceService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.parkingService.create(this.parking).subscribe(data => {
      console.log(data);

      if (data.message == "Validation Failed") {
        data.details.forEach(element => {
          const keys = Object.keys(element);
          const key = keys[0];
          const value = element[key];
          switch (key) {
            case "bookId":
              {
                this.bookId = value;
                break;
              }
            case "vehicleNo": {
              this.VNo = value;
              break;
            }
            case "phoneNo": {
              this.phoneNumber = value;
              break;
            }
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
          this.bookId = data.code;
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
  Id(){
    this.bookId='';
  }
  vNumber(){
    this.VNo='';
  }
  phone(){
    this.phoneNumber='';
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
