import {Pipe, PipeTransform} from '@angular/core';
import {IPost} from '../../../shared/interfaces/post';

@Pipe({
  name: 'searchPosts'
})
export class SearchPipe implements PipeTransform {
  public transform(posts: IPost[], search: string = ''): IPost[] {
    if (!search.trim().length) {
      return posts;
    }
    return posts.filter(post => post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
  }
}
