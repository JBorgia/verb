import { Pipe, PipeTransform } from '@angular/core';
import { ItemEntity } from '../models/youtube-response';

@Pipe({
  name: 'titleFilter'
})
export class TitleFilterPipe implements PipeTransform {

  transform(items: ItemEntity[], ...args: string[]): ItemEntity[] {
    return args[0] ? items.filter(videoItem => videoItem.snippet.title.match(new RegExp(args[0], 'i'))) : items;
  }

}
