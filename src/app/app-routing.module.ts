import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './components/heroes/heroes.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import {HeroDetailComponent} from './components/hero-detail/hero-detail.component';
import {TreeviewComponent} from './components/treeview/treeview.component';

import {AuthGuard} from './auth.guard';

const routes:Routes = [
	{
		path: '',
		component: LoginformComponent,
		//redirectTo:'/login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		component: LoginformComponent
	},
	{
		path: 'dashboard',
		canActivate: [AuthGuard],
		component: DashboardComponent
	},
	{
		path: 'detail/:id',
		canActivate: [AuthGuard],
		component:HeroDetailComponent,
		runGuardsAndResolvers: `always`,
	},
	{
		path: 'user',
		canActivate: [AuthGuard],
		component: UserComponent
	},
	{
		path: 'heroes',
		canActivate: [AuthGuard],
		component: HeroesComponent
	},
	{
		path: 'treeview',
		canActivate: [AuthGuard],
		component: TreeviewComponent
	},
]


@NgModule({
  exports: [
    RouterModule
  ],
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: `reload`}) ],
})
export class AppRoutingModule { }
