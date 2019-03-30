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
  		name: ['',Validators.required],
  		email: ['',Validators.required],
  		password: ['',[Validators.required,Validators.minLength(6)]],
  		dob: ['',Validators.required],

  	});
  }
  // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

  //method calls after click on submit button  
  onSubmit(){
  	this.submitted = true
  	if(!this.registerForm.valid){
  		
  		return

  	}
  	//Toaster for notification
  	this.toastr.success('Your Form Has been Submitted Successfully!', 'Success!',
    {timeOut: 2000});; 
    console.log('User Name: '+this.registerForm.controls['name'].value,'\nhello');
  }

}
