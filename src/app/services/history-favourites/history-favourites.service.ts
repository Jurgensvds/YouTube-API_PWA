import { Injectable } from '@angular/core';
import { LocalVideo } from '@interfaces/local-storage/local-video';

const FAVOURITE_KEY = 'AUG-YouTubeAPI_favouriteItems';
const HISTORY_KEY = 'AUG-YouTubeAPI_historyItems';

type storageInterface = {allVids: {videoID: string, actionDate: string}[]}
type keyTypes = 'favourite' | 'history';

@Injectable({
  providedIn: 'root'
})
export class HistoryFavouritesService {
  favouriteVideos: storageInterface = {allVids:[]};
  historyVideos: storageInterface = {allVids:[]};

  constructor() {
    // localStorage.clear();
    this.favouriteVideos = this.getStorageVideos('favourite');
    this.historyVideos = this.getStorageVideos('favourite');
  }

  addNewVideoToStorage(videoID: string, key: keyTypes){
    const selectedKey = (
      key === 'favourite' ? FAVOURITE_KEY :
      key === 'history' ? HISTORY_KEY : '')

    let found: boolean = false;
    let parsedVideo:storageInterface = this.getStorageVideos(key);
    for(let vid of parsedVideo.allVids){
      if(vid.videoID === videoID){
        found = true;
        vid.actionDate = `${new Date().getTime()}`;
      }
    }
    if(!found){
      parsedVideo.allVids.push(new LocalVideo({videoID, actionDate: `${new Date().getTime()}`}).toJson());
      localStorage.setItem(selectedKey, JSON.stringify(parsedVideo))
    }
  }

  getStorageVideos(key: keyTypes){
    const selectedKey = (
      key === 'favourite' ? FAVOURITE_KEY :
      key === 'history' ? HISTORY_KEY : '')

    const jsonString : string = (
      localStorage.getItem(selectedKey) ? 
      localStorage.getItem(selectedKey) ?? '{"allVids":[]}' : '{"allVids":[]}');
    return JSON.parse(jsonString); 
  }

  getAllIDs(key: keyTypes){
    const selectedKey = (
      key === 'favourite' ? FAVOURITE_KEY :
      key === 'history' ? HISTORY_KEY : '')

      let parsedVideo:storageInterface = this.getStorageVideos(key);
      parsedVideo.allVids = [...parsedVideo.allVids.sort((a, b) => {
        return (
          (parseInt(a.actionDate) > parseInt(b.actionDate)) ? -1 : 
          (parseInt(b.actionDate) > parseInt(a.actionDate)) ? 1 : 0
        )
      })]

      return parsedVideo.allVids.map((vid) => {return vid.videoID});
  }

  removeVideo(vidID:string, key: keyTypes){
    const selectedKey = (
      key === 'favourite' ? FAVOURITE_KEY :
      key === 'history' ? HISTORY_KEY : '')
    let parsedVideo:storageInterface = this.getStorageVideos(key);
    parsedVideo.allVids = parsedVideo.allVids.filter(vid => {return vid.videoID !== vidID})
    localStorage.setItem(selectedKey, JSON.stringify(parsedVideo))
  }
}
