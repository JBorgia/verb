import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { VideoComponent } from './videos/video/video.component';
import { VideosComponent } from './videos/videos.component';
import { YoutubeComponent } from './youtube.component';

const routes: Routes = [
  {
    path: '',
    component: YoutubeComponent
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    CommonModule
  ],
  declarations: [
    SearchComponent,
    VideosComponent,
    VideoComponent,
    YoutubeComponent
  ],
})
export class YoutubeModule { }
