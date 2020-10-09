import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { VideosComponent } from './videos/videos.component';
import { ModalComponent } from './modal/modal.component';
import { VideoComponent } from './videos/video/video.component';
import { YoutubeComponent } from './youtube/youtube.component';



@NgModule({
  declarations: [SearchComponent, VideosComponent, ModalComponent, VideoComponent, YoutubeComponent],
  imports: [
    CommonModule
  ]
})
export class YoutubeModule { }
