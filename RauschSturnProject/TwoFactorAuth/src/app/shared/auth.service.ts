import { Injectable } from '@angular/core';
import { Auth } from './auth.model';
import { HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
  
  export class AuthService {
    formData  : Auth;
    readonly URL ="https://localhost:44318/api/Auth"
   
    constructor(private http : HttpClient) { }

    postAuth(str){
        return this.http.post(this.URL, str );
    }

    
  }