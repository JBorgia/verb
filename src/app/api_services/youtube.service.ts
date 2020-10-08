import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube-response';
import { Observable } from 'rxjs';

const KEY = 'AIzaSyBWz5y1wIdpY8pH8IyyFtnBdpe7j0Bhcac';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient) {}

  getMostPopularVideos(): Observable<YoutubeResponse> {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&chart=mostPopular&key=${KEY}`;

    return this.http.get<YoutubeResponse>(url);
  }
}
