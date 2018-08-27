/**
 * https://angular.io/guide/forms
 */
import { Component, OnInit } from '@angular/core';
import {Member} from '../../classes/member';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  model = new Member(0, '', '');

  submitted = false;

  genders = ["Male","Female"];

  constructor() { }

  ngOnInit() {}
  
  saveFamilyMember() { 
    this.submitted = true;
    console.log(JSON.stringify(this.model));
   }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
