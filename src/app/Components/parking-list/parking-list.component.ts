import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Parking } from 'src/app/Models/parking';
import { ParkingServiceService } from 'src/app/parking-service.service';
import 'datatables.net';
import * as $ from 'jquery';

@Component({
  selector: 'app-parking-list',
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.css']
})
export class ParkingListComponent implements OnInit, OnDestroy {
  intervalId: any;
  selectedItem: any;
  date: string = '';
  Sdate: string = '';
  SStartDate: string = '';
  SEndDate: String = '';
  SStatus: string = '';
  SType: string = '';
  SCName: string = '';
  SVNumber: string = '';



  constructor(private httpClient: HttpClient, private parkingService: ParkingServiceService, private router: Router, private toastr: ToastrService, private jwtService: JwtHelperService) { }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      if (localStorage.getItem("accesstoken") != null && (this.jwtService.isTokenExpired(localStorage.getItem('accesstoken'))) || localStorage.getItem('accesstoken') == null) {
        this.router.navigate(['login']);
      }

    }, 500)
    this.initializeDataTable();
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  initializeDataTable() {
    const table = $('#myTable').DataTable({
      serverSide: true,
      processing: false,
      searching: false,
      ordering: false,
      lengthMenu: [5, 10, 15, 20, 25],
      ajax: (data: any, callback: any) => {
        this.httpClient.get('http://localhost:1009/parking/parkingSearch', {
          params: {
            iDisplayStart: (data.start / data.length).toString(),
            iDisplayLength: data.length.toString(),
            searchParam: JSON.stringify({ vehicleType: this.SType, customerName: this.SCName, dateOfParking: this.Sdate, startDate: this.SStartDate, endDate: this.SEndDate, status: this.SStatus }) // Pass the search term here
            //searchParam:''
          }

        }).subscribe((response: any) => {
          callback({
            draw: data.draw,
            recordsTotal: response.details[0].iTotalRecords,
            recordsFiltered: response.details[0].iTotalDisplayRecords,
            data: response.details[0].aaData,
          });
        });
      },
      columns: [
        { data: 'bookId' },
        { data: 'vehicleNo' },
        { data: 'phoneNo' },
        { data: 'customerName' },
        { data: 'vehicleType' },
        { data: 'dateOfParking' },
        { data: 'days' },
        { data: 'price' },
        {
          data: 'status',
          render: function (data) {
            switch (data) {
              case "PENDING":
                return '<span style="color:blue;font-weight :500;">PENDING</span>'
              case "BOOKED":
                return '<span style="color:green";font-weight:500>BOOKED</span>'
              case "PARKED":
                return '<span style="color:blue;font-weight :500;">PARKED</span>'
              case "DEPARTED":
                return '<span style="color:red;font-weight :500;">DEPARTED</span>'
              case "CANCELLED":
                return '<span style="color:red;font-weight :500;">CANCELLED</span>'
              default:
                return data;
            }
          }
        }

      ],
      rowCallback: (row: Node, data: any) => {
        $(row).off('click').on('click', () => {
          if ($(row).hasClass('selected')) {
            $('#myTable tr.selected').removeClass('selected');
          } else {
            $('#myTable tr.selected').removeClass('selected');
            $(row).addClass('selected');
          }
          this.onRowSelect(data);
        });
      }


    });
  }
  onRowSelect(parking: Parking) {
    if (this.selectedItem === parking) {
      this.selectedItem = null;
    } else {
      this.selectedItem = parking;
    }
  }
  update() {
    if (this.selectedItem == null) {
      this.toastr.warning("Select a row First");
    }
    else {
      switch (this.selectedItem.status) {
        case "PARKED":
          {
            this.toastr.warning("Vehicle already parked");
            break;
          }
        case "DEPARTED":
          {
            this.toastr.warning("Vehicle already departed");
            break;
          }
        case "CANCELLED":
          {
            this.toastr.warning("Status already cancelled");
            break;
          }
        default: {
          this.router.navigate(['update'], { queryParams: this.selectedItem });
        }

      }

    }
  }
  status() {
    if (this.selectedItem == null) {
      this.toastr.warning("Select a row First");
    } else {
      this.router.navigate(['verify'], { queryParams: this.selectedItem });

    }
  }
  cancel() {
    if (this.selectedItem == null) {
      this.toastr.warning("Select a row first")
    }
    else {
      this.parkingService.cancelstatus(this.selectedItem).subscribe(data => {

        if (data.code == "FAILED") {
          this.toastr.error(data.message);
        }
        if (data.code == "SUCCESS") {
          this.toastr.success(data.message);
          this.selectedItem = null;
          $('#myTable').DataTable().draw();

        }
      })

    }

  }
  onSubmit() {
    $('#myTable').DataTable().draw();

  }
  refreshMehtod() {
    if (this.date == '' &&
      this.Sdate == '' &&
      this.SStartDate == '' &&
      this.SEndDate == '' &&
      this.SStatus == '' &&
      this.SType == '' &&
      this.SCName == '' &&
      this.SVNumber == '') {
      $('#myTable').DataTable().draw();
    }

  }
  refresh() {
    this.date = '';
    this.Sdate = '';
    this.SStartDate = '';
    this.SEndDate = '';
  }
  clear() {
    this.date = '';
    this.Sdate = '';
    this.SStartDate = '';
    this.SEndDate = '';
    this.SStatus = '';
    this.SType = '';
    this.SCName = '';
    this.SVNumber = '';
    $('#myTable').DataTable().draw();

  }
}
