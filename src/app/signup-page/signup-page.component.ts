import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  registerForm:FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService) { }

  ngOnInit() {
  	this.registerForm = this.formBuilder.group({
  		name: ['',[Validators.required,Validators.maxLength(20)]],
  		email: ['',[Validators.required,Validators.email]],
  		password: ['',[Validators.required,Validators.minLength(6)]],
  		dob: ['',Validators.required],

  	});
  }
  // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

  //method calls after click on submit button  
  onSubmit(){
  	this.submitted = true
  	if(this.submitted){
  		if(!this.registerForm.valid){ //return error messages if submitted form is not valid
  		
	  		return

	  	}
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
