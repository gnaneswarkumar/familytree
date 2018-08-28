import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Member} from '../classes/member';
import {MessageService} from './message.service';

import {catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  Url = '';
  constructor(private http: HttpClient, private messageService: MessageService) { }

  addMember(member){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' })
    };

    this.Url = 'http://localhost:8080/hero/new';
    console.log('in MemberService addMember '+JSON.stringify(member));
     this.http.post(this.Url,member,httpOptions).subscribe(res=>{
       console.log(res);
     },
     err => {
      console.log("Error occured");
    });

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
