import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ChannelDetails } from '@interfaces/youTube-api/channel-details-interface';
import { Videos } from '@interfaces/youTube-api/videos-interface';
import { HeaderNavService } from '@services/headerNav/header-nav.service';
import { HistoryFavouritesService } from '@services/history-favourites/history-favourites.service';
import { LoaderService } from '@services/loader/loader.service';
import { YouTubeService } from '@services/youTube/you-tube.service';

@Component({
  selector: 'app-favourites-tab',
  templateUrl: './favourites-tab.component.html',
  styleUrls: ['./favourites-tab.component.scss'],
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
export class FavouritesTabComponent implements OnInit {

  videos: Videos = new Videos();
  loadingVideos: Videos = new Videos();

  constructor(
    private favouriteService: HistoryFavouritesService,
    private youTubeService: YouTubeService,
    private loaderService: LoaderService,
    private headerService: HeaderNavService
  ) {
    this.headerService.showBackButton = false;
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.loaderService.loaderText = "Getting favourites";
    this.loaderService.loading = true;
    this.youTubeService.getVideosByIds(this.favouriteService.getAllIDs('favourite')).then(async (videos) => {
      this.populateVideos(videos);
      this.loaderService.loading = false;
    }).catch((err) => {
      console.log(err);
      this.loaderService.loading = false;
    })
  }

  async populateVideos(videoResults:Videos){
    this.loadingVideos = new Videos(videoResults);
    this.loadingVideos.items
    for(let video of this.loadingVideos.items){
      let channelDetails = await this.youTubeService.getChannelDetailsByID(video.snippet.channelId);
      if(channelDetails.pageInfo.totalResults > 0){
        video.channelDetails = new ChannelDetails(this.youTubeService.formatChannelData(channelDetails));
      }
    }
    this.videos = new Videos(this.loadingVideos);
    for(let vid of this.videos.items){
      vid.active = true;
    }
}

  removeVideo(vidID:string = 'newId'){
    this.favouriteService.removeVideo(vidID, 'favourite')
  }
}
