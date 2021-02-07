import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { ChannelDetails } from '@interfaces/youTube-api/channel-details-interface';
import { Videos, VideoSearch } from '@interfaces/youTube-api/videos-interface';

const KEY = environment.youTubeApiKey;
const URL = 'https://www.googleapis.com/youtube/v3'

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {

  constructor(private http: HttpClient) { }

  async getVideosBySearch(searchString: string, pageKey:string = '', maxResults:string = '10'){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let params = new HttpParams();
    params = params.append("key", KEY);
    params = params.append("part", "snippet");
    params = params.append("type", "video");
    params = params.append("q", searchString);
    params = params.append("pageToken", pageKey);
    params = params.append("maxResults", maxResults);
    params = params.append("order", 'relevance');

    const allVideos = await this.http.get<VideoSearch>(`${URL}/search`, {params: params}).toPromise();
    const nextPageKey = allVideos.nextPageToken;
    // console.log(allVideos);
    const allVideoIds = allVideos.items.map(item => {return item.id.videoId});
    // console.log(allVideoIds)
    let vids: Videos = await this.getVideosByIds(allVideoIds);
    vids.nextPageToken = nextPageKey
    return vids;
  }

  getMostPopularVideos(pageKey:string = '', region: string = 'au', maxResults:string = '10'){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append("key", KEY);
    params = params.append("part", "player, snippet, statistics, contentDetails");
    params = params.append("maxResults", maxResults);
    params = params.append("chart", "mostPopular");
    params = params.append("regionCode", region);
    params = params.append("pageToken", pageKey);

    return this.http.get<Videos>(`${URL}/videos`, {params: params}).toPromise();
  }

  getVideosByIds(videoIds:string[], maxResults:string = '10'){
    let params = new HttpParams();
    params = params.append("key", KEY);
    params = params.append("part", "player, snippet, statistics, contentDetails");
    params = params.append("maxResults", maxResults);
    params = params.append("id", videoIds.join());

    return this.http.get<Videos>(`${URL}/videos`, {params: params}).toPromise();
  }

  getChannelDetailsByID(channelID:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append("key", KEY);
    params = params.append("part", "snippet, statistics");
    params = params.append("id", channelID);

    return this.http.get<any>(`${URL}/channels`, {params: params}).toPromise();
  }

  formatChannelData(channelResponseData: any):ChannelDetails{
    return new ChannelDetails({
      title: channelResponseData.items[0].snippet.title,
      description: channelResponseData.items[0].snippet.description,
      thumbnails: channelResponseData.items[0].snippet.thumbnails,
      subscriberCount: channelResponseData.items[0].statistics.subscriberCount,
    })
  }
}


