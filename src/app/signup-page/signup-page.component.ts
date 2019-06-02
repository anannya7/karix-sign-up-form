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
  chartOptions = {
    scales: {
        yAxes: [{
              ticks: {
                  beginAtZero: true,
                 userCallback: function(label, index, labels) {
                   if (Math.floor(label) === label) {
                     return label;
                   }

                 },
              }
          }]
      },
      responsive: true, // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
      maintainAspectRatio: true
          
    }
    labels =  ['1hr','2hr','3hr','4hr','5hr','6hr','7hr','8hr','9hr','10hr','11hr','12hr','13hr','14hr','15hr','16hr','17hr','18hr','19hr','20hr','21hr','22hr','23hr','24hr'];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData = [
    {
      label: 'Message Count',
      data: [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,0 , 0 , 0 ,0 , 0 , 0 ] 
    } 
  ];

  // CHART COLOR.
  colors = [
    { // Quiz Bar label.
      backgroundColor: 'rgba(255,255,255, 0.9)'
    },
    
  ]
  

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService, private httpClient: HttpClient , private appservice: AppService) { }

  ngOnInit() {
  	this.registerForm = this.formBuilder.group({
  		name: ['',[Validators.required,Validators.maxLength(20)]],
  		email: ['',[Validators.required,Validators.email]],
  		password: ['',[Validators.required,Validators.minLength(6)]],
  		dob: ['',Validators.required],
      uid: ['6e9d22a6-2e74-439e-888b-721fa1312251',Validators.required],
      token: ['e8e7f546-b60d-4efd-9717-9766f4f087b9',Validators.required],


  	});
  }

  // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }


  messageList;
  temp_val;
  //method calls after click on submit button  
  onSubmit(){
  		if(!this.registerForm.valid){ //return error messages if submitted form is not valid
  		
	  		return

	  	}
      else{
        

         this.appservice.getData(this.registerForm.value.uid,this.registerForm.value.token).subscribe(
           res=>{

            console.log(res);
            this.messageList = res['objects'];
            this.temp_val = this.messageList;
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
  show_graph:boolean = false;
  showGraph(){
    this.show_graph = !this.show_graph
    this.callChartData();//Method to initiate chart values
  }
  filterColumDropdownChange(value){
    this.messageList =  this.temp_val;
    if(value != 'all'){
      const new_val = this.messageList.filter(msg =>{
        return msg.status === value
      });
      this.messageList = new_val;
    }


  }
  callChartData(){
    var hrJson = {'0': 0, '1': 0, '2': 0, '3':0, '4': 0, '5': 0, '6':0, '7': 0, '8': 0, '9':0, '10': 0, '11': 0, '12':0, '13': 0, '14': 0, '15':0, '16':0, '17': 0, '18': 0, '19':0, '20':0, '21': 0, '22': 0, '23':0}


    for(let i=0; i< this.messageList.length; i++){
        if( this.messageList[i].sent_time != null){
            var hr = (new Date(( this.messageList[i].sent_time))).getHours();
            hrJson[hr] += 1;
        }
    }
    var y_arr = Object.values(hrJson);
    console.log(y_arr);

    
    this.chartData = [
    {
      label: 'Message Count',
      data: y_arr 
    }  ]


  }

}
