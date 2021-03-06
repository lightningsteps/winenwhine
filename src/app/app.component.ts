import { Component, OnInit } from '@angular/core';
import { Wine } from './models/Wine';
import { CommentData } from './models/CommentData';
import { AppService } from './services/app-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _appService: AppService) { }

  comments: Array<CommentData>;
  wines: Array<Wine>;
  p: number = 1;

  ngOnInit() {
    this.getReviews();
  }

  search(pattern: String) {

    if (pattern === "" || pattern === undefined) {
      alert("Can't search for nothing!");
      return;
    }

    this.comments = new Array<CommentData>();
    this.wines = new Array<Wine>();

    this._appService.getReviewsSearch(pattern.toLocaleLowerCase()).subscribe(
      response => {
        console.log(response);
        if (response['_body'].length < 3) {
          alert("No results found.");
          console.log("No results found.");
          return;
        }
        for (let i = 0; i < response.json().length; i++) {

          const win = new Wine();
          win.id = Number(response.json()[i]['id']);
          win.country = response.json()[i]['country'];
          win.description = response.json()[i]['description'];
          win.points = Number(response.json()[i]['points']);
          win.price = Number(response.json()[i]['price']);
          win.province = response.json()[i]['province'];
          win.taster_twitter_handle = response.json()[i]['taster_twitter_handle'];
          win.title = response.json()[i]['title'];
          win.winery = response.json()[i]['winery'];
          win.image = response.json()[i]['image'];

          let coms = Array<CommentData>();

          for (let j = 0; j < response.json()[i]['comments'].length; j++) {

            const com = new CommentData();
            com.commenter = response.json()[i]['comments'][j]['commenter'];
            com.comment = response.json()[i]['comments'][j]['comment'];

            coms.push(com);
          }
          win.comments = coms;
          this.wines.push(win);
        }
      }
    )
  }

  getReviews() {
    this.comments = new Array<CommentData>();
    this.wines = new Array<Wine>();

    this._appService.getReviews().subscribe(
      response => {
        //console.log(response);
        for (let i = 0; i < response.json().length; i++) {

          const win = new Wine();
          win.id = Number(response.json()[i]['id']);
          win.country = response.json()[i]['country'];
          win.description = response.json()[i]['description'];
          win.points = Number(response.json()[i]['points']);
          win.price = Number(response.json()[i]['price']);
          win.province = response.json()[i]['province'];
          win.taster_twitter_handle = response.json()[i]['taster_twitter_handle'];
          win.title = response.json()[i]['title'];
          win.winery = response.json()[i]['winery'];
          win.image = response.json()[i]['image'];

          let coms = Array<CommentData>();

          for (let j = 0; j < response.json()[i]['comments'].length; j++) {

            const com = new CommentData();
            com.commenter = response.json()[i]['comments'][j]['commenter'];
            com.comment = response.json()[i]['comments'][j]['comment'];

            coms.push(com);
          }
          win.comments = coms;
          this.wines.push(win);
        }
      }
    )
  }

  sendComment(id: number, com: CommentData) {
    this._appService.sendComments(id, com).subscribe(
      response => {
        console.log(response.json());
        this.wines.forEach(element => {
          if (element.id === response.json()['id']) {
            element.comments = response.json()['comments'];
          }
        });
      });
  }


  onSubmit(id: number, comName: string, comBody: string) {

    
    if (comName==="" || comBody==="" || comName===undefined || comBody===undefined) {
      alert("Please input name and comment.");
      return;
    }

    const cNew = new CommentData();
    cNew.commenter = comName;
    cNew.comment = comBody;

    this.sendComment(id, cNew);
    console.log(id);
    console.log(cNew);

    cNew.commenter = "";
    cNew.comment = "";
  }
}
