import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, filter, startWith, switchMap, tap } from 'rxjs/operators';
import { YoutubeService } from '../api_services/youtube.service';
import { YoutubeResponse } from '../models/youtube-response';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements AfterViewInit {
  @ViewChild('search') search: SearchComponent;
  videos: Observable<YoutubeResponse>;

  constructor(
    private cdr: ChangeDetectorRef,
    private youtubeService: YoutubeService
  ) { }

  ngAfterViewInit(): void {
    this.videos = this.search.searchForm.controls.search.valueChanges.pipe(
      debounceTime(300),
      filter(query => query.length > 2),
      startWith(this.search.searchForm.controls.search.value),
      tap(query => console.log('query', query)),
      switchMap(query => query ? this.youtubeService.search(query) : this.youtubeService.getMostPopularVideoSnippets()),
      tap(res => console.log('res', res))
    );
    this.cdr.detectChanges();
  }

}
