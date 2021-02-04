import { Component, OnInit } from '@angular/core';
import { ChannelDetails } from '@interfaces/youTube-api/channel-details-interface';
import { Videos } from '@interfaces/youTube-api/videos-interface';
import { YouTubeService } from '@services/youTube/you-tube.service';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.component.html',
  styleUrls: ['./home-tab.component.scss']
})
export class HomeTabComponent implements OnInit {

  videos: Videos = new Videos();
  loadingVideos: Videos = new Videos();

  constructor(
    private youTubeService: YouTubeService
  ) { }

  ngOnInit(): void {
    this.youTubeService.getMostPopularVideos().then(async (result) => {
      this.loadingVideos = new Videos(result);
      for(let video of this.loadingVideos.items){
        let channelDetails = await this.youTubeService.getChannelDetailsByID(video.snippet.channelId);
        if(channelDetails.pageInfo.totalResults > 0){
          video.channelDetails = new ChannelDetails(this.youTubeService.formatChannelData(channelDetails));
        }
      }

      this.videos = this.loadingVideos;
    }).catch((err) => {
      console.log(err);
    })
  }

}
