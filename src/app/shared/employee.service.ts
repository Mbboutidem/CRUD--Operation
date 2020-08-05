import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import {Observanle} from '@angular/core'
//import 'rxjs/add/operator/map';

const bUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];
  // readonly bUrl = '';

  constructor(private _http: HttpClient)
   { }
   //get data
   getEmployeeData(){
     return this._http.get(`${bUrl}`);
   }
   //post request
   postEmployee(emp: Employee){
     return this._http.post(`${bUrl}`, emp)
   }
   //put
   putEmployee(emp: Employee){
     return this._http.put(`${bUrl}/${emp._id}`, emp);
   }
   //delete data
   deletEmployeeData(_id: string){
     return this._http.delete(`${bUrl}/${_id}`);
   }

}
