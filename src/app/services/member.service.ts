import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Member} from '../classes/member';
import {MessageService} from './message.service';

import {catchError, map, tap } from 'rxjs/operators';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  Url = '';
  constructor(private http: HttpClient, private messageService: MessageService) { }
  /**
   * 
   * @param id 
   */
  getMember(id:number):Observable<Member[]>{
    this.messageService.add('Members Service: fateching member details');

    return this.http.get<Member[]>(environment.apiUrl+'member/'+id).pipe(
      tap(),catchError(this.handleError('getMember',[]))
    );
  }
  /**
   * fetch the list of male members of the family.
   */
  getMaleMembersList():Observable<Member[]>{
    this.messageService.add('Members Service: fateching male members list');

    return this.http.get<Member[]>(environment.apiUrl+'malemembers').pipe(
      tap(),catchError(this.handleError('getMembersList',[]))
    );
  }
  /**
   * fetch the list of female members of the family.
   */
  getFemaleMembersList():Observable<Member[]>{
    this.messageService.add('Members Service: fateching female members list');

    return this.http.get<Member[]>(environment.apiUrl+'femalemembers').pipe(
      tap(),catchError(this.handleError('getFemaleMembersList',[]))
    );
  }
  
  /**
   * @param member 
   */
  addMember<T>(member){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' })
    };
    /**
     * POST Example - https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
     */
   
    console.log('in MemberService addMember '+JSON.stringify(member));

    let data = new FormData();
    
    var member_dob = '';
    if(member.member_dob!=null)
    member_dob = new Date(member.member_dob).toDateString();
    
    var member_dod = '';
    if(member.member_dod!=null)
    member_dod = new Date(member.member_dod).toDateString();

    data.append('name',member.member_name);
    data.append('gender',member.member_gender);
    data.append('father',member.member_father);
    data.append('mother',member.member_mother);
    data.append('wives',member.member_wives);
    data.append('dob',member_dob);
    data.append('dod',member_dod);
    data.append('image',member.profile_picture, member.profile_picture.name);

    return this.http.post<T>(environment.apiUrl+'hero/new',data);

     /**
      * Previous inside subscribe
      * res=>{
      console.log(res);
    },
    err => {
      console.log("Error occured");
    }
      */

  }

  private log(message:string){
    this.messageService.add('HeroService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log('${operation} failed: ${error.message}');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
