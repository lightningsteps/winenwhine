import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Headers, RequestMethod } from '@angular/http';

@Injectable()
export class AppService {

  constructor(private _http: Http) {
  }

  getReviews(): Observable<any> {
    return this._http.get('http://localhost:3000/getReviews');
  }
}