import {Component, Input} from '@angular/core';
import {IPost} from '../../interfaces/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() public post: IPost;
}
