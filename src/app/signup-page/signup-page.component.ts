import { Component, OnInit } from '@angular/core';
import {  Headers } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders , HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  registerForm:FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService, private httpClient: HttpClient , private appservice: AppService) { }

  ngOnInit() {
  	this.registerForm = this.formBuilder.group({
  		name: ['',[Validators.required,Validators.maxLength(20)]],
  		email: ['',[Validators.required,Validators.email]],
  		password: ['',[Validators.required,Validators.minLength(6)]],
  		dob: ['',Validators.required],
      uid: ['',Validators.required],
      token: ['',Validators.required],


  	});
  }
  // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }


  messageList;
  //method calls after click on submit button  
  onSubmit(){
  		if(!this.registerForm.valid){ //return error messages if submitted form is not valid
  		
	  		return

	  	}
      else{
        debugger

         this.appservice.getData(this.registerForm.value.uid,this.registerForm.value.token).subscribe(
           res=>{

            console.log(res);
            this.messageList = res['objects'];
            this.submitted = true

           },err=>{
             console.log(err);
           })

      }

  	//Toaster for notification
  	this.toastr.success('Your Form Has been Submitted Successfully!', 'Success!',
    {timeOut: 2000});; 
    console.log('User Name: '+this.registerForm.controls['name'].value,'\nUser Email:'+this.registerForm.controls['email'].value,'\nUser Date of Birth:'+this.registerForm.controls['dob'].value);
    this.callResetForm();
  }
  //Method to reset the signup form make submitted false
  callResetForm(){
  	this.submitted = false;

  	this.registerForm.reset();
  }

}
