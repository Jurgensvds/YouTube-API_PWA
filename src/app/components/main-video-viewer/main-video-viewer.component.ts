import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { VideoItem } from '@interfaces/youTube-api/video-items-interface';
import { HeaderNavService } from '@services/headerNav/header-nav.service';
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

  constructor(public headerService: HeaderNavService) { }

  ngOnInit(): void {
    this.listenToClick = this.headerService.backExecute.subscribe(val => {
      if(val){
        this.cancelButton();
        this.listenToClick.unsubscribe();
      }
    })
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
    return false;
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
  // getThumbnailHeight(){
  //   return this.thumbnail? `${this.thumbnail.clientWidth * 0.56}px` : '0px'
  // }
}
