import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { VideoItem } from '@interfaces/youTube-api/video-items-interface';

@Component({
  selector: 'app-main-video-viewer',
  templateUrl: './main-video-viewer.component.html',
  styleUrls: ['./main-video-viewer.component.scss']
})
export class MainVideoViewerComponent implements OnInit {
  @ViewChild('thumbnail') thumbnail!: ElementRef<HTMLDivElement>;

  mainVideo: VideoItem = new VideoItem();

  @Input() set video(val: VideoItem){
    this.mainVideo = new VideoItem(val);
    // this.mainVideo.
  };

  constructor() { }

  ngOnInit(): void {
    // console.log(this.mainVideo)
    // this.mainVideo.channelDetails?.getThumbnail(5)
  }

  ngAfterViewChecked(): void {
    this.setThumbnailHeight();
  }

  setThumbnailHeight(){
    this.thumbnail.nativeElement.style.height = `${this.thumbnail.nativeElement.clientWidth * 0.56}px`
  }

  // getThumbnailHeight(){
  //   return this.thumbnail? `${this.thumbnail.clientWidth * 0.56}px` : '0px'
  // }
}
