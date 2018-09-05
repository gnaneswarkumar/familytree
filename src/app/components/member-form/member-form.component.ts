/**
 * https://angular.io/guide/forms
 */
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import {Member} from '../../classes/member';
import {MemberService} from '../../services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  wivesMultiSelect = new FormControl();

  model = new Member(0, '', '');

  submitted = false;

  genders = [{'key':"M",'value':"Male"},{'key':"F",'value':"Female"}];

  fathersList = [];
  mothersList = [];
  wivesList = [];

  result:any; 

  constructor(private memberService:MemberService) { }
/**
 * 
 */
  ngOnInit() {
    this.getFathersList();
    this.getMothersList();
    this.getWivesList();
  }
  /**
   * 
   */
  saveFamilyMember() {

    this.submitted = true;
    //console.log(JSON.stringify(this.model));
    this.memberService.addMember(this.model).subscribe(result => {

      var resKeys = Object.keys(result);
      var success:string='error';
      var newMember;


      for(var i=0;i<resKeys.length;i++){
        var key = resKeys[i];
        console.log(key, result[key]);
        if(key=='status'){
          success = result[key];
          if(success=='success'){
            this.hideAddForm();
            this.alertSuccess();
          }
        } else if(key=='insert' && success=='success'){
          newMember = result[key];
          this.appendNewMember(newMember[0]);
        }
      }
    });
   }
   /**
    * 
    */
   alertSuccess(){

   }
   /**
    * 
    */
   hideAddForm(){
      var element = window.document.getElementById('closeAddFamilyMemberForm') as any;
      element.click();
   }
   /**
    * 
    * @param newMember 
    */
   appendNewMember(newMember){
    if(newMember.gender=='M'){
      this.fathersList.push(newMember);
    } else if(newMember.gender=='F'){
      this.mothersList.push(newMember);
      this.wivesList.push(newMember);
    }
   }
   /**
    * 
    */
   getFathersList(){
    this.memberService.getMaleMembersList().subscribe(fathersList=>this.fathersList=fathersList);
   }
   /**
    * 
    */
   getMothersList(){
    this.memberService.getFemaleMembersList().subscribe(mothersList=>this.mothersList=mothersList);
   }
   /**
    * 
    */
   getWivesList(){
    this.memberService.getFemaleMembersList().subscribe(wivesList=>this.wivesList=wivesList);
   }
  /**
   * 
   */
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
