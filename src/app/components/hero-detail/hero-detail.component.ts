import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';
import { Location } from '@angular/common';

import { Observable, Subject } from 'rxjs';

import {Hero} from '../../hero';
import {Member} from '../../classes/member';

import {HeroService} from '../../services/hero.service';
import {UserService} from '../../services/user.service';
import { MemberService } from '../../services/member.service';

import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit, OnDestroy {
  @Input() hero:Hero;
  @Input() member;

  //imagePath:string = 'assets/images/';
  imagePath:string = environment.apiUrl+'images/profile/'; 
  fullImagePath:string = this.imagePath+'img_avatar3.png';

  isAdminUser$: Observable<boolean>;

  // ... your class variables here
  navigationSubscription;

  wifeHusbandText;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private heroService: HeroService,
    private memberService: MemberService,
    private userService: UserService,
    private location: Location) {
    // subscribe to the router events - storing the subscription so
    // we can unsubscribe later.
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
    // If it is a NavigationEnd event re-initalise the component
    if (e instanceof NavigationEnd) {
      this.initialiseInvites();
    }
    });
   }

  ngOnInit() :void{
  	//this.getHero();
    this.isAdminUser$ = this.userService.isUserAdmin;
  }

  initialiseInvites() {
    // Set default values and re-fetch any data you need.
    this.getHero();
  }

  ngOnDestroy() {
   // avoid memory leaks here by cleaning up after ourselves. If we
   // don't then we will continue to run our initialiseInvites()
   // method on every navigationEnd event.
   if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
   }
 }
  /**
   * 
   */
  getHero():void{
  	const id = +this.route.snapshot.paramMap.get('id');
  	/*this.heroService.getHero(id).subscribe(hero=>{
      this.hero=hero;
      this.wifeHusbandText = (this.hero.gender == 'male') ? 'Wife' : 'Husband';
      console.log(this.hero);
    });*/

    this.memberService.getMember(id).subscribe(member=>{
      this.member = member[0];
      this.wifeHusbandText = (this.member.member_gender == 'M') ? 'Wife(s)' : 'Husband';
      if(this.member.profile_picture){
        this.fullImagePath = this.imagePath+this.member.profile_picture;
      } else{
        this.fullImagePath = (this.member.member_gender=='M') ? this.imagePath+'img_male_avatar.png' : this.imagePath+'img_female_avatar.png';
      }
      
      console.log(this.member);
    });


  }
  /**
   * 
   */
  goBack(){
  	this.location.back();
  }
  /**
   * 
   */
  save(): void {
   this.heroService.updateHero(this.hero)
     .subscribe(() => this.goBack());
 }
}
