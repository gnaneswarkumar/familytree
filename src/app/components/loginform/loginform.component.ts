import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  constructor(private router:Router, private user:UserService) { }

  ngOnInit() {
  }

  loginUser(e){
	e.preventDefault();
	var username = e.target.elements[0].value;
	var password = e.target.elements[1].value;
	//console.log(username, password);
	if(username=='admin' && password=='admin'){
		this.user.setUserLoggedIn();
    this.user.setUserRole('admin');
		this.router.navigate(['dashboard']);
	} else if(username=='user' && password=='user'){
    this.user.setUserLoggedIn();
    this.user.setUserRole('user');
    this.router.navigate(['dashboard']);
  }
	return false;
  }

}
