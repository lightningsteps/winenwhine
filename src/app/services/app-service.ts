import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Headers, RequestMethod } from '@angular/http';
import { CommentData } from '../models/CommentData';
import { Wine } from '../models/Wine';

@Injectable()
export class AppService {

  constructor(private _http: Http) {
  }

  getReviews(): Observable<any> {
    return this._http.get('http://localhost:3000/getReviews');
  }

  sendComments(id: number, comment: CommentData): Observable<Response> {
    const headers = new Headers({ 'ContentType': 'application/x-www-form-urlencoded'});

    return this._http.post('http://NESTONESTO/' + id + '/comments', comment);
  }
}