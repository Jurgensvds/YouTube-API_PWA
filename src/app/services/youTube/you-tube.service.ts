import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment'
import { Videos, VideoSearch } from '@interfaces/youTube-api/videos-interface';

const KEY = environment.youTubeApiKey;
const URL = 'https://www.googleapis.com/youtube/v3/search'

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {

  constructor(private http: HttpClient) { }

  getVideosBySearch(searchString: string, maxResults:string = '20'){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(KEY)
    let params = new HttpParams();
    params = params.append("key", KEY);
    params = params.append("part", "snippet");
    params = params.append("q", searchString);
    params = params.append("maxResults", maxResults);

    return this.http.get<VideoSearch>(URL, {params: params}).toPromise();
  }
}


