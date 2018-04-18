import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Headers, RequestMethod } from '@angular/http';
import { CommentData } from '../models/CommentData';
import { Wine } from '../models/Wine';

@Injectable()
export class AppService {

  baseUrl: string = "http://localhost:3000/";

  constructor(private _http: Http) {
  }

  getReviews(): Observable<any> {
    return this._http.get( this.baseUrl + 'getReviews');
  }

  sendComments(id: number, comment: CommentData): Observable<Response> {
    const headers = new Headers({ 'ContentType': 'application/x-www-form-urlencoded'});

<<<<<<< HEAD
    return this._http.post(this.baseUrl + id + '/comments', comment);
=======
    return this._http.post('http://http://localhost:3000/' + id + '/comments', comment);
>>>>>>> 04f377b49d4c934ab8900397ccf77961dfe99e33
  }
}