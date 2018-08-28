/**
 * https://angular.io/guide/forms
 */
import { Component, OnInit } from '@angular/core';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Member} from '../../classes/member';
import {MemberService} from '../../services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  model = new Member(0, 'Gnaneswar Kumar', 'Male');

  submitted = false;

  genders = ["Male","Female"];

  result:any; 

  constructor(private memberService:MemberService) { }

  ngOnInit() {}
  
  saveFamilyMember() { 
    this.submitted = true;
    //console.log(JSON.stringify(this.model));
    this.result = this.memberService.addMember(this.model);
    //console.log(this.result);
   }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
