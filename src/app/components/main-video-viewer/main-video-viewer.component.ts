import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { VideoItem } from '@interfaces/youTube-api/video-items-interface';
import { HeaderNavService } from '@services/headerNav/header-nav.service';
import { HistoryFavouritesService } from '@services/history-favourites/history-favourites.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-video-viewer',
  templateUrl: './main-video-viewer.component.html',
  styleUrls: ['./main-video-viewer.component.scss']
})
export class MainVideoViewerComponent implements OnInit {
  @ViewChild('thumbnail') thumbnail!: ElementRef<HTMLDivElement>;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLDivElement>;
  
  @Input() set video(val: VideoItem){
    this.mainVideo = new VideoItem(val);
    // this.mainVideo.
  };
  @Output() select: EventEmitter<any> = new EventEmitter();

  mainVideo: VideoItem = new VideoItem();
  selectedVideo: boolean = false;
  listenToClick: Subscription = new Subscription();
  playVideo: boolean = false;

  favouriteVideoIDs: string[] = [];

  constructor(
    public headerService: HeaderNavService,
    public historyFavouriteService: HistoryFavouritesService,
    public matSnack: MatSnackBar
  ) {
    
  }

  ngOnInit(): void {
    this.listenToClick = this.headerService.backExecute.subscribe(val => {
      if(val){
        this.cancelButton();
        this.listenToClick.unsubscribe();
      }
    })
    // console.log(this.mainVideo.id);
    this.favouriteVideoIDs = [...this.historyFavouriteService.getAllIDs('favourite')];
  }

  ngAfterViewChecked(): void {
    this.setThumbnailHeight();
  }

  setThumbnailHeight(){
    this.thumbnail.nativeElement.style.height = `${this.thumbnail.nativeElement.clientWidth * 0.56}px`
  }

  selectVideo(){
    this.select.emit(true);
    this.headerService.showBackButton = true;
    this.loadVideo();
    this.selectedVideo = true;
    this.addToHistory();
  }

  getLineWidth(){
    const total = parseInt(this.mainVideo.statistics.likeCount) + parseInt(this.mainVideo.statistics.dislikeCount);
    return `${(parseFloat(this.mainVideo.statistics.likeCount) / total) * 100}%`;
  }

  cancelButton(){
    this.selectedVideo = false;
    this.playVideo = false;
    this.select.emit(false);
  }

  isFavourite(){
    return this.favouriteVideoIDs.includes(this.mainVideo.id);
  }

  loadVideo(){
    this.playVideo = true;
    setTimeout(() => {
      console.log(this.mainVideo.player.embedHtml)
      let embed = this.mainVideo.player.embedHtml.replace(`width="480"`, `width="100%"`);
      embed = embed.replace(`height="270"`, `height="100%"`);
      //remove fullScreen functionality
      // embed = embed.replace("allowfullscreen", '');

      this.videoPlayer.nativeElement.innerHTML = embed;
    },100)
  }

  manageFavourite(){
    if(this.isFavourite()){
      this.historyFavouriteService.removeVideo(this.mainVideo.id, 'favourite');
      this.favouriteVideoIDs = [...this.historyFavouriteService.getAllIDs('favourite')];
      
      this.matSnack.open('Video removed from favourites', 'Ok', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
    else{
      console.log(this.mainVideo.id)
      this.historyFavouriteService.addNewVideoToStorage(this.mainVideo.id, 'favourite');
      this.favouriteVideoIDs = [...this.historyFavouriteService.getAllIDs('favourite')];

      this.matSnack.open('Video was added to favourites', 'Ok', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }

  addToHistory(){
    this.historyFavouriteService.addNewVideoToStorage(this.mainVideo.id, 'history');
  }
  // getThumbnailHeight(){
  //   return this.thumbnail? `${this.thumbnail.clientWidth * 0.56}px` : '0px'
  // }
}
