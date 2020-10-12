import { Component, ViewChild } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { YoutubeService } from '../api_services/youtube.service';
import { ItemEntity } from '../models/youtube-response';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent {
  @ViewChild('search', { static: true }) search: SearchComponent;
  videoItems: ItemEntity[];
  filterString: '';
  nextPageToken: string;

  constructor(
    private youtubeService: YoutubeService
  ) { }

  onSearch(query: string) {
    (query ? this.youtubeService.search(query) : this.youtubeService.getMostPopularVideoSnippets()).pipe(
      tap(res => this.nextPageToken = res.nextPageToken),
      map(res => res.items)
    ).subscribe(videoItems => this.videoItems = videoItems);
  }

  /**
   * When searching for results, at the 80% of the end of the scrollable area more results are requested
   */
  onScroll(event: any) {
    const scrollPercent = .80;

    if (
      event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight * scrollPercent &&
      this.search.searchForm.controls.search.value &&
      this.nextPageToken
    ) {
      this.youtubeService.getNextPage(this.search.searchForm.controls.search.value, this.nextPageToken).pipe(
        tap(res => this.nextPageToken = res.nextPageToken),
        map(res => res.items)
      ).subscribe(videoItems => this.videoItems.push(...videoItems));
    }
  }
}
