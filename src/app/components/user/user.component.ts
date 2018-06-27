import { Component, OnInit } from '@angular/core';
import { UserService} from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	name:string;
	age:number;
	email:string;
	address:Address;
	hobbies:string[];
  constructor(private user:UserService) { }

  ngOnInit() {
	this.name = 'Gnaneswar Kumar';
	this.age = 39;
	this.email = 'test@gmail.com';
	this.address ={
		street : 'street string',
		city : 'city string',
		state:'state string'
	};
	this.hobbies = ['A','B','C'];
  }

}


interface Address{
	street:string,
	city:string,
	state:string
}