import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YoutubeResponse } from '../models/youtube-response';

const KEY = 'AIzaSyBWz5y1wIdpY8pH8IyyFtnBdpe7j0Bhcac';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getMostPopularVideoSnippets(query?: string): Observable<YoutubeResponse> {
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&key=${KEY}`;

    let params = new HttpParams();
    params = params.append('q', query);

    return this.http.get<YoutubeResponse>(url, { params: params }).pipe();
  }
}
