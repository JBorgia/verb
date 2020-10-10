import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { YoutubeService } from '../api_services/youtube.service';
import { YoutubeResponse } from '../models/youtube-response';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {
  videos: Observable<YoutubeResponse>;

  constructor(
    private youtubeService: YoutubeService
  ) { }

  ngOnInit(): void {
    this.videos = this.youtubeService.getMostPopularVideoSnippets().pipe(
      tap(res => console.log('res', res))
    );
  }

}
