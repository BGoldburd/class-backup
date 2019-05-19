import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Post } from './post';

interface BlogProperties {
  id: number;
  name: string;
  website: string;
  company: {
    name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private httpClient: HttpClient) {
    // const myObservable: Observable<number> = of(4);
    // myObservable.subscribe(x => console.log('Got', x));
  }

  getBlogs() {
    return this.httpClient.get<BlogProperties[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(map(blogs => blogs.map(
        blog => ({
          id: blog.id,
          name: blog.name,
          website: blog.website,
          company: blog.company.name
        })
      )));
  }

  getPosts(blogId: number) {
    return this.httpClient.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${blogId}`)
      .pipe(map(posts => posts.map(
        post => ({
          title: post.title,
          body: post.body
        })
      )));
  }
}
