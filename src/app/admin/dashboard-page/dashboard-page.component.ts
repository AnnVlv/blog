import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../shared/services/post.service';
import {IPost} from '../../shared/interfaces/post';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: IPost[] = [];
  public forSearching: string;
  private gettingSubscription: Subscription;
  private removingSubscription: Subscription;

  constructor(private postService: PostService, private alertService: AlertService) {
  }

  public ngOnInit(): void {
    this.fetchPosts();
  }

  public ngOnDestroy(): void {
    if (this.gettingSubscription) {
      this.gettingSubscription.unsubscribe();
    }
    if (this.removingSubscription) {
      this.removingSubscription.unsubscribe();
    }
  }

  public removePost(postId: string): void {
    this.removingSubscription = this.postService.remotePost(postId).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== postId);
      this.alertService.callNext('success', 'The post was deleted');
    }, () => this.alertService.callNext('danger', 'Error!'));
  }

  private fetchPosts(): void {
    this.gettingSubscription = this.postService.getPosts().subscribe((posts: IPost[]) => {
      if (!posts) {
        return;
      }
      this.posts = posts;
    });
  }
}
