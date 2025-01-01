import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from './Models/users';
import { Parking } from './Models/parking';

@Injectable({
  providedIn: 'root'
})
export class ParkingServiceService {

  constructor(private httpClient:HttpClient) { }
  baseURL="http://localhost:1009/parking"
  login(user:Users):Observable<any>{
    return this.httpClient.post(`${this.baseURL}/getaccesstoken`,user);
  }
  create(parking:Parking):Observable<any>{
    return this.httpClient.post(`${this.baseURL}/add`,parking);
  }
  update(parking:Parking):Observable<any>{
    return this.httpClient.put(`${this.baseURL}/update`,parking);
  }
  statusUpdate(parking:Parking):Observable<any>{
    return this.httpClient.put(`${this.baseURL}/status`,parking);
  }
  cancelstatus(parking:Parking): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/cancel`,parking);
  }
  getById(bookId: string, vehicleNo: string, phoneNo: string): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/get/${bookId}/${vehicleNo}/${phoneNo}`)
  }
}
