import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable, Subject } from 'rxjs';

import { Router } from '@angular/router';

@Injectable()
export class UserService {
	
	private isUserLoggedIn = new BehaviorSubject(true);
	private username;
	
  constructor(private router:Router,) { 
	this.isUserLoggedIn.next(false);
  }
  
  setUserLoggedIn(){
	this.isUserLoggedIn.next(true);
  }
  
  getUserLoggedIn(){
	return this.isUserLoggedIn;
  }
  logoutUser(){
  	this.isUserLoggedIn.next(false);
  	this.router.navigate(['login']);
  }
  get isLoggedIn() {
    return this.isUserLoggedIn.asObservable();
  }
  
}
