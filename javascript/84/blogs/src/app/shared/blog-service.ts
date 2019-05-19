import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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
}
