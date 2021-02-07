import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ChannelDetails } from '@interfaces/youTube-api/channel-details-interface';
import { VideoItem } from '@interfaces/youTube-api/video-items-interface';
import { Videos } from '@interfaces/youTube-api/videos-interface';
import { HeaderNavService } from '@services/headerNav/header-nav.service';
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
  sectionHeading: string = '';
  pageModeHome: boolean = true;
  lastSearch: string = '';
  nextPageKey: string = '';
  loadingMore: boolean = true;
  videoSelected: boolean = false;

  constructor(
    private youTubeService: YouTubeService,
    private loaderService: LoaderService,
    private headerService: HeaderNavService
  ) {
    this.headerService.showBackButton = false;
  }

  ngOnInit(): void {
    this.initializePage();
    this.headerService.searchResult.subscribe((searchString) => {
      this.subscribeToSearch(searchString)
    })
    this.sectionHeading = 'Top results in your area'
  }

  initializePage(){
    this.loaderService.loading = true;
    this.loaderService.loaderText = "Loading videos"
    this.youTubeService.getMostPopularVideos().then(async (result) => {
      await this.populateVideos(result)
      this.loadingMore = false;
      this.loaderService.loading = false;
    }).catch((err) => {
      console.log(err);
      this.loaderService.loading = false;
    })
  }

  subscribeToSearch(searchString:string){
    if(searchString !== ''){
      this.loaderService.loading = true
      this.loaderService.loaderText = "Searching..."
      this.lastSearch = searchString;
      this.pageModeHome = false;
      this.youTubeService.getVideosBySearch(searchString, '', '10').then(async (val) => {
        this.nextPageKey = val.nextPageToken;
        await this.populateVideos(val)
        this.sectionHeading = 'Search results';
        this.loaderService.loading = false;
      }).catch((err) => {
        console.log(err)
        this.loaderService.loading = false;
      })
    }
  }

  async populateVideos(videoResults:Videos){
    this.loadingVideos = new Videos(videoResults);
    this.loadingVideos.items

    this.nextPageKey = this.loadingVideos.nextPageToken;
    for(let video of this.loadingVideos.items){
      video.active = true;
      let channelDetails = await this.youTubeService.getChannelDetailsByID(video.snippet.channelId);
      if(channelDetails.pageInfo.totalResults > 0){
        video.channelDetails = new ChannelDetails(this.youTubeService.formatChannelData(channelDetails));
      }
    }
    this.videos = new Videos(this.loadingVideos);
  }

  async appendVideos(videoResults:Videos){
    this.loadingVideos = new Videos(videoResults);
    this.loadingVideos.items
    
    this.nextPageKey = this.loadingVideos.nextPageToken; 
    for(let video of this.loadingVideos.items){
      video.active = true;
      let channelDetails = await this.youTubeService.getChannelDetailsByID(video.snippet.channelId);
      if(channelDetails.pageInfo.totalResults > 0){
        video.channelDetails = new ChannelDetails(this.youTubeService.formatChannelData(channelDetails));
      }
    }
    this.videos.items = [...this.videos.items, ...this.loadingVideos.items];
  }

  selectVideo(select: boolean, item: VideoItem){
    this.videoSelected = select;
    for(let item of this.videos.items){
      item.active = !select;
    }
    item.active = true;
  }

  loadMorePopular(){
    this.loadingMore = true;
    this.youTubeService.getMostPopularVideos(this.nextPageKey).then(async (result) => {
      await this.appendVideos(result)
      this.loadingMore = false;
    }).catch((err) => {
      console.log(err);
      this.loadingMore = false;
    })
  }

  loadMoreSearch(){
    this.loadingMore = true;
    console.log(this.nextPageKey)
    this.youTubeService.getVideosBySearch(this.lastSearch, this.nextPageKey, '10').then(async (result) => {
      await this.appendVideos(result)
      this.loadingMore = false;
    }).catch((err) => {
      console.log(err);
      this.loadingMore = false;
    })
  }
}
