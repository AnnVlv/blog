import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {PostService} from '../../shared/services/post.service';
import {IPost} from '../../shared/interfaces/post';
import {AlertService} from '../shared/services/alert.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  public post: IPost;
  public form: FormGroup;
  public isDisabledButton: boolean;
  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private alertService: AlertService
  ) {
  }

  public ngOnInit(): void {
    this.fetchPost();
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public updatePost(): void {
    const postToUpdate = {
      ...this.post,
      ...this.form.value
    };
    this.isDisabledButton = true;
    this.subscription = this.postService.patchPost(postToUpdate).subscribe((newPost: IPost) => {
      this.post = newPost;
      this.isDisabledButton = false;
      this.alertService.callNext('success', 'Post was edited');
    }, (() => this.alertService.callNext('danger', 'Error!')));
  }

  private fetchPost(): void {
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postService.getById(params.id);
      }))
      .subscribe((post: IPost) => {
        this.post = post;
        this.buildForm();
      });
  }

  private buildForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.post.title, [Validators.required]),
      content: new FormControl(this.post.content, [Validators.required])
    });
  }
}
