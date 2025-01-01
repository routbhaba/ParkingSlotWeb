import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Users } from 'src/app/Models/users';
import { ParkingServiceService } from 'src/app/parking-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = '';
  password: string = '';
  user: Users = new Users();
  constructor(private parkingService: ParkingServiceService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('formdata');
  }
  onSubmit() {
    console.log(this.user);
    this.parkingService.login(this.user).subscribe(data => {
      if (data.message == "Validation Failed") {
        data.details.forEach(element => { 
          const keys = Object.keys(element);
          const key = keys[0];
          const value = element[key];
          if (key == 'userName') {
            this.userName = value;
          }
        });
      } else {
        if (data.code === "FAILED") {
          this.userName = data.message;
        } else {
          if (data.access_token == "No token") {
            this.password = "Invalid Password";
          }
          else {
            localStorage.setItem('accesstoken', data.details[0].Data.body.access_token);
            this.toastr.success('Login Sucessfull');

            this.router.navigateByUrl('parking-list');
          }
        } 
     
      }
    }) 
  }
  removename() {
    this.userName

  }

  removepass() {
    this.password = '';
  }

}
