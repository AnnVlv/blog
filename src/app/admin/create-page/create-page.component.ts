import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IPost} from '../../shared/interfaces/post';
import {PostService} from '../../shared/services/post.service';
import {AlertService} from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  public form: FormGroup;
  public isDisabledButton: boolean = false;

  constructor(private postService: PostService, private alertService: AlertService) {
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public submit(): void {
    const post: IPost = {
      ...this.form.value,
      date: new Date()
    };
    this.isDisabledButton = true;
    this.postService.createPost(post).subscribe((newPost: IPost) => {
      this.form.reset();
      this.isDisabledButton = false;
      this.alertService.callNext('success', 'The post was created');
    }, () => this.alertService.callNext('danger', 'Error!'));
  }

  private buildForm(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required])
    });
  }
}
