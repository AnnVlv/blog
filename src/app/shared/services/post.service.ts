import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IPost} from '../interfaces/post';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  public getPosts(): Observable<IPost[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map((response: { [key: string]: any }) => {
          if (!response) {
            return;
          }
          return Object.keys(response).map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }));
        })
      );
  }

  public getById(id: string): Observable<IPost> {
    return this.http.get(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(
        map((post: IPost) => {
          return {
            ...post,
            id,
            date: new Date(post.date)
          };
        })
      );
  }

  public createPost(post: IPost): Observable<IPost> {
    return this.http.post<{ name: string }>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((response: { name: string }) => {
          return {
            ...post,
            date: new Date(),
            id: response.name
          };
        })
      );
  }

  public patchPost(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${environment.fbDbUrl}/posts/${post.id}.json`, post);
  }

  public remotePost(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`);
  }
}
