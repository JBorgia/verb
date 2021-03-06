import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YoutubeResponse } from '../models/youtube-response';
// // import { MOCK } from './MOCK';

const KEY = 'AIzaSyBWz5y1wIdpY8pH8IyyFtnBdpe7j0Bhcac';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(private http: HttpClient) { }

  getMostPopularVideoSnippets(): Observable<YoutubeResponse> {
    const url = `https://www.googleapis.com/youtube/v3/videos`;

    let params = new HttpParams();
    params = params.append('part', 'snippet');
    params = params.append('chart', 'mostPopular');
    params = params.append('key', KEY);
    // return of(MOCK as YoutubeResponse);
    return this.http.get<YoutubeResponse>(url, { params }).pipe();
  }

  search(query: string): Observable<YoutubeResponse> {
    const url = `https://www.googleapis.com/youtube/v3/search`;

    let params = new HttpParams();
    params = params.append('key', KEY);
    params = params.append('q', query);
    params = params.append('part', 'snippet');
    params = params.append('type', 'video');
    params = params.append('order', 'rating');
    params = params.append('maxResults', '50');
    // return of(MOCK as YoutubeResponse);
    return this.http.get<YoutubeResponse>(url, { params }).pipe();
  }

  getNextPage(query: string, nextPageToken: string, maxResults: number = 10): Observable<YoutubeResponse> {
    const url = `https://www.googleapis.com/youtube/v3/search`;

    let params = new HttpParams();
    params = params.append('key', KEY);
    params = params.append('pageToken', nextPageToken);
    params = params.append('q', query);
    params = params.append('part', 'snippet');
    params = params.append('type', 'video');
    params = params.append('order', 'rating');
    params = params.append('maxResults', `${maxResults}`);
    // return of(MOCK as YoutubeResponse);
    return this.http.get<YoutubeResponse>(url, { params }).pipe();
  }
}
