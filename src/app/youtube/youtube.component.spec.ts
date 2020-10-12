import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'angular-custom-modal';
import { of } from 'rxjs';
import { MOCK } from '../api_services/MOCK';
import { YoutubeService } from '../api_services/youtube.service';
import { YoutubeResponse } from '../models/youtube-response';
import { SearchComponent } from './search/search.component';
import { TitleFilterPipe } from './title-filter.pipe';
import { VideoComponent } from './videos/video/video.component';
import { VideosComponent } from './videos/videos.component';
import { YoutubeComponent } from './youtube.component';


describe('YoutubeComponent', () => {
  let searchComponent: SearchComponent;
  let searchFixture: ComponentFixture<SearchComponent>;

  let component: YoutubeComponent;
  let fixture: ComponentFixture<YoutubeComponent>;

  let youtubeService: YoutubeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ModalModule, FormsModule, ReactiveFormsModule],
      declarations: [VideoComponent, VideosComponent, YoutubeComponent, SearchComponent, TitleFilterPipe],
      providers: [YoutubeService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    searchFixture = TestBed.createComponent(SearchComponent);
    searchComponent = searchFixture.componentInstance;
    searchFixture.detectChanges();

    fixture = TestBed.createComponent(YoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    youtubeService = fixture.debugElement.injector.get(YoutubeService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load an initial 50 videoItems and fetch more on scroll', () => {
    spyOn(youtubeService, 'getMostPopularVideoSnippets').and.returnValue(of(MOCK as YoutubeResponse));
    spyOn(component, 'onSearch');
    spyOn(youtubeService, 'search').and.returnValue(of(MOCK as YoutubeResponse));
    spyOn(youtubeService, 'getNextPage').and.returnValue(of(MOCK as YoutubeResponse));

    expect(component.videoItems.length).toBe(50);

    component.search.searchForm.controls.search.patchValue('cat', { eventEmit: false });
    component.onSearch('cat');
    expect(component.onSearch).toHaveBeenCalled();
    expect(component.videoItems.length).toBe(50);

    component.onScroll({ target: { offsetHeight: 2868, scrollTop: 417, scrollHeight: 2804, } });
    expect(youtubeService.getNextPage).toHaveBeenCalled();
    expect(component.videoItems.length).toBe(100);
  });

});
