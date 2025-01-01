import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Parking } from 'src/app/Models/parking';
import { ParkingServiceService } from 'src/app/parking-service.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  parking:Parking=new Parking();
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
    console.log(this.parking);
    this.parkingService.statusUpdate(this.parking).subscribe(data => {
      if (data.code == "FAILED") {
        console.log(data);
        this.toastr.warning(data.message);
      }
      else if(data.code=="SUCCESS"){
        console.log(data.message);
        this.toastr.success(data.message);
        this.router.navigate(['parking-list']);
      }

    })

  }
  cancel(){
    this.router.navigate(['parking-list']);
  }

}
                     