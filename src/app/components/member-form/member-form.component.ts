/**
 * https://angular.io/guide/forms
 */
import { Component, OnInit } from '@angular/core';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {Member} from '../../classes/member';
import {MemberService} from '../../services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  model = new Member(0, '', '');

  submitted = false;

  genders = [{'key':"M",'value':"Male"},{'key':"F",'value':"Female"}];

  fathersList = [];
  mothersList = [];

  result:any; 

  constructor(private memberService:MemberService) { }

  ngOnInit() {
    this.getFathersList();
    this.getMothersList();
  }
  
  saveFamilyMember() { 
    this.submitted = true;
    //console.log(JSON.stringify(this.model));
    this.result = this.memberService.addMember(this.model);
    //console.log(this.result);
   }

   getFathersList(){
    this.memberService.getMaleMembersList().subscribe(fathersList=>this.fathersList=fathersList);
   }
   getMothersList(){
    this.memberService.getFemaleMembersList().subscribe(mothersList=>this.mothersList=mothersList);
   }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
