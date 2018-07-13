import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Observable, Subject } from 'rxjs';

import { Router } from '@angular/router';

@Injectable()
export class UserService {

	private isUserLoggedIn = new BehaviorSubject(true);
	private isAdminUser = new BehaviorSubject(false);
	//private username;
	private userRole:string = 'user';

  constructor(private router:Router,) {
		this.isUserLoggedIn.next(false);
		this.isAdminUser.next(false);
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

	setUserRole(role){
		this.userRole = role;
		if(this.userRole=='admin'){
			this.isAdminUser.next(true);
		}
	}
	getUserRole(){
		return this.userRole;
	}

	get isUserAdmin(){
		return	this.isAdminUser.asObservable();
	}

  get isLoggedIn() {
    return this.isUserLoggedIn.asObservable();
  }

}
