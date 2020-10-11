import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { YoutubeService } from '../api_services/youtube.service';
import { ItemEntity } from '../models/youtube-response';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements AfterViewInit {
  @ViewChild('search') search: SearchComponent;
  videoItems$: Observable<ItemEntity[]>;
  videoItems: ItemEntity[];
  nextPageToken: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private youtubeService: YoutubeService
  ) { }

  ngAfterViewInit(): void {
    this.search.searchForm.controls.search.valueChanges.pipe(
      debounceTime(300),
      filter(query => query.length > 2),
      startWith(this.search.searchForm.controls.search.value),
      switchMap(query => query ? this.youtubeService.search(query) : this.youtubeService.getMostPopularVideoSnippets()),
      tap(res => this.nextPageToken = res.nextPageToken),
      map(res => res.items)
    ).subscribe(videoItems => this.videoItems = videoItems);
    this.cdr.detectChanges();
  }

  /**
   * When searching for results, at the 80% of the end of the scrollable area more results are requested
   */
  onScroll(event: any) {
    if (
      event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight * .80 &&
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
