import { Component, OnInit } from '@angular/core';
import { Videos } from '@interfaces/youTube-api/videos-interface';
import { YouTubeService } from '@services/youTube/you-tube.service';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.component.html',
  styleUrls: ['./home-tab.component.scss']
})
export class HomeTabComponent implements OnInit {

  videos: Videos = new Videos();

  constructor(
    private youTubeService: YouTubeService
  ) { }

  ngOnInit(): void {
    this.youTubeService.getMostPopularVideos().then((result) => {
      this.videos = new Videos(result);
    }).catch((err) => {
      console.log(err);
    })
  }

}
