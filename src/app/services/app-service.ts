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
    const options = new RequestOptions({ headers: headers });

<<<<<<< HEAD
    return this._http.post('http://http://localhost:3000/' + id.toString() + '/comments', comment, options);
=======
    return this._http.post(this.baseUrl + id + '/comments', comment);
>>>>>>> 0551cd2e9ac87c2072f77ca994b629e33f8e12b2
  }
}