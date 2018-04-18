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

  ngOnInit() {
    this.getReviews();
  }

  newComment () {
    //this.model = new CommentData();
  }

  getReviews() {
    this.comments = new Array<CommentData>();
    this.wines = new Array<Wine>();

    this._appService.getReviews().subscribe(
      response => {
        console.log(response);
        for (let i = 0; i < response.json().length; i++) {

          const win = new Wine();
          win.id = Number(response.json()[i]['id']);
          win.country = response.json()[i]['country'];
          win.description = response.json()[i]['description'];
          win.designation = response.json()[i]['designation'];
          win.points = Number(response.json()[i]['points']);
          win.price = Number(response.json()[i]['price']);
          win.province = response.json()[i]['province'];
          win.region_1 = response.json()[i]['region_1'];
          win.region_2 = response.json()[i]['region_2'];
          win.taster_name = response.json()[i]['taster_name'];
          win.taster_twitter_handle = response.json()[i]['taster_twitter_handle'];
          win.title = response.json()[i]['title'];
          win.variety = response.json()[i]['variety'];
          win.winery = response.json()[i]['winery'];

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

    console.log(this.wines);
  }

  sendComment(id: number, com: CommentData) {
    this._appService.sendComments(id, com).subscribe(
      response => {
        console.log(response);
        console.log(id);
        console.log(com);
      });
  }

  onSubmit(id: number, comName: string, comBody: string){
    const cNew = new CommentData();
    cNew.commenter = comName;
    cNew.comment = comBody;

    this.sendComment(id, cNew);
    console.log(id);
    console.log(cNew);
  }
}
