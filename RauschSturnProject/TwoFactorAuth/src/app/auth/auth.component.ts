import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  subscription: Subscription;
  errorMessage:any;
  showError = false;
  constructor(public  service: AuthService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    this.errorMessage ="";
    this.service.formData = {
      code: "",
    }
  }

  onSubmit(form: NgForm) {
    this.submitCode(form);
  }

  
  submitCode(form: NgForm) {
    
    this.service.postAuth(form.value).subscribe(result => {
      this.resetForm(form);
      console.log(result);
        alert(result);
    }, errorObj => {
      console.log(errorObj);
      this.showError = true;
      if(errorObj.status == 400) {
        this.errorMessage = errorObj.error;
      }
      else if(errorObj.status == 401 || errorObj.status == 403) {
        this.errorMessage = errorObj.error;
      }
      else if(errorObj.status == 500) {
        this.errorMessage = errorObj.error.ExceptionMessage;
      }
      else {
        this.errorMessage="Something is wrong, please try again later"
      }
    }); 
  }
 
}
