import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(public employService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }
  //submit function
  onSubmit(form: NgForm){
    if(form.value._id == ""){
      this.employService.postEmployee(form.value).subscribe(res =>{
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      })
    }else{
      this.employService.putEmployee(form.value).subscribe(res =>{
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      })
    }
  }
  refreshEmployeeList() {
    //it returns observable form get function
    this.employService.getEmployeeData().subscribe((res) => {
      this.employService.employees = res as Employee[]; //assigning an object to employee array
    });
  }
  // reset function
  resetForm(form?: NgForm) {
    if (form)
    form.reset();
  this.employService.selectedEmployee = {
    _id: "",
    name: "",
    position: "",
    office: "",
    salary: null}
  }
  //edit the value on the table
  onEdit(emp: Employee) {
    this.employService.selectedEmployee = emp;
  }
  //delete button
  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record?') == true) {
      //function request an observable
      this.employService.deletEmployeeData(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
