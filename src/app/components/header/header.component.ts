import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	title:string = '';
	isLoggedIn$: Observable<boolean>;
  isAdminUser$: Observable<boolean>;

  constructor(private userService:UserService) { }

  ngOnInit() {
  	this.title = 'Family Tree';
  	this.isLoggedIn$ = this.userService.isLoggedIn;
    this.isAdminUser$ = this.userService.isUserAdmin;
  }
  onLogout(){
  	this.userService.logoutUser();
  }
}
