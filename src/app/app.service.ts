import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  tokenValue;
  userId;
  constructor(private http: HttpClient) { }
  user_id;
  token_id;
  getData(uid,token){
    this.user_id = uid
    this.token_id = token;
	const httpOptions = {
	  headers: new HttpHeaders({
	    'Content-Type':  'application/json',
	    'Authorization': 'Basic ' + btoa(this.user_id+":"+this.token_id)
	  })
	};

     return this.http.get('https://api.karix.co/message/', httpOptions); 


  }
}
