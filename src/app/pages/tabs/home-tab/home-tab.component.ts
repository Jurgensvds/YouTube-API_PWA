import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ChannelDetails } from '@interfaces/youTube-api/channel-details-interface';
import { VideoItem } from '@interfaces/youTube-api/video-items-interface';
import { Videos } from '@interfaces/youTube-api/videos-interface';
import { LoaderService } from '@services/loader/loader.service';
import { YouTubeService } from '@services/youTube/you-tube.service';

@Component({
  selector: 'app-home-tab',
  templateUrl: './home-tab.component.html',
  styleUrls: ['./home-tab.component.scss'],
  animations: [
    trigger(
      'outAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('300ms ease-in', 
                    style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('300ms ease-in', 
                    style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class HomeTabComponent implements OnInit {

  videos: Videos = new Videos();
  loadingVideos: Videos = new Videos();

  constructor(
    private youTubeService: YouTubeService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loaderService.loading = true;
    this.loaderService.loaderText = "Loading videos."
    this.youTubeService.getMostPopularVideos().then(async (result) => {
      this.loadingVideos = new Videos(result);
      this.loadingVideos.items
      for(let video of this.loadingVideos.items){
        let channelDetails = await this.youTubeService.getChannelDetailsByID(video.snippet.channelId);
        if(channelDetails.pageInfo.totalResults > 0){
          video.channelDetails = new ChannelDetails(this.youTubeService.formatChannelData(channelDetails));
        }
      }
      this.loaderService.loading = false;
      this.videos = new Videos(this.loadingVideos);
      for(let vid of this.videos.items){
        vid.active = true;
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  selectVideo(select: boolean, item: VideoItem){
    for(let item of this.videos.items){
      item.active = !select;
    }
    item.active = true;
  }

}
