import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable, Subject } from 'rxjs';

import {Hero} from '../../hero';

import {HeroService} from '../../services/hero.service';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
	@Input() hero:Hero;

  isAdminUser$: Observable<boolean>;

  constructor(private route: ActivatedRoute,
  private heroService: HeroService,
  private userService: UserService,
  private location: Location) { }

  ngOnInit() :void{
  	this.getHero();
    this.isAdminUser$ = this.userService.isUserAdmin;
  }

  getHero():void{
  	const id = +this.route.snapshot.paramMap.get('id');
  	this.heroService.getHero(id).subscribe(hero=>{
      this.hero=hero;
      console.log(this.hero);
    });
  }
  goBack(){
  	this.location.back();
  }

  save(): void {
   this.heroService.updateHero(this.hero)
     .subscribe(() => this.goBack());
 }
}
