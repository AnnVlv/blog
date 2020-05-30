import {Component, OnInit} from '@angular/core';
import {PostService} from '../shared/services/post.service';
import {Observable} from 'rxjs';
import {IPost} from '../shared/interfaces/post';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public posts$: Observable<IPost[]>;

  constructor(private postService: PostService) {
  }

  public ngOnInit(): void {
    this.fetchPosts();
  }

  private fetchPosts(): void {
    this.posts$ = this.postService.getPosts();
  }
}
