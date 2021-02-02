import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Videos, VideoSearch } from '@interfaces/youTube-api/videos-interface';

const KEY = environment.youTubeApiKey;
const URL = 'https://www.googleapis.com/youtube/v3'

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {

  constructor(private http: HttpClient) { }

  getVideosBySearch(searchString: string, maxResults:string = '20'){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let params = new HttpParams();
    params = params.append("key", KEY);
    params = params.append("part", "player, snippet, statistics, contentDetails");
    params = params.append("q", searchString);
    params = params.append("maxResults", maxResults);

    return this.http.get<VideoSearch>(`${URL}/search`, {params: params}).toPromise();
  }

  getMostPopularVideos(region: string = 'au', maxResults:string = '20'){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let params = new HttpParams();
    params = params.append("key", KEY);
    params = params.append("part", "player, snippet, statistics, contentDetails");
    params = params.append("maxResults", maxResults);
    params = params.append("chart", "mostPopular");
    params = params.append("regionCode", region);

    return this.http.get<Videos>(`${URL}/videos`, {params: params}).toPromise();
  }
}


