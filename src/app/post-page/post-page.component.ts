import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IPost} from '../shared/interfaces/post';
import {PostService} from '../shared/services/post.service';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  public post$: Observable<IPost>;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {
  }

  public ngOnInit(): void {
    this.post$ = this.route.params.pipe(switchMap((params: Params) => this.postService.getById(params.id)));
  }
}
