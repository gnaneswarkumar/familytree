import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {Hero} from '../../hero';
import {HeroService} from '../../services/hero.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
	heroes: Hero[];

  selectedHero:Hero;

  isAdminUser$: Observable<boolean>;

  constructor(private heroService:HeroService, private userService:UserService) { }

  ngOnInit() {
	this.getHeroes();
  this.isAdminUser$ = this.userService.isUserAdmin;
  }
  getHeroes():void{
	//this.heroes = this.heroService.getHeroes();
	this.heroService.getHeroes().subscribe(heroes=>this.heroes=heroes);
  }

  onSelect(hero:Hero):void{
	this.selectedHero = hero;
  }

  delete(hero: Hero[]):void{
    //this.heroes = this.heroes.filter(hero=>hero!==hero);
    this.heroService.deleteHero(hero).subscribe();
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();

    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

}
