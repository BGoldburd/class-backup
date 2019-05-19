import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Blog } from '../shared/blog';
import { BlogService } from '../shared/blog-service';

/*interface BlogProperties {
  id: number;
  name: string;
  website: string;
  company: {
    name: string;
  };
}*/

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy {
  // subscription: Subscription;
  // blogs: Blog[];
  blogs: Observable<Blog[]>;

  constructor(/*private httpClient: HttpClient*/
    private blogService: BlogService
  ) { }

  ngOnInit() {
    /*this.subscription =*/
    /*this.blogs = this.httpClient.get<BlogProperties[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(map(blogs => blogs.map(
        blog => ({
          id: blog.id,
          name: blog.name,
          website: blog.website,
          company: blog.company.name
        })
      )));*/
    /*.subscribe(blogs => {
      this.blogs = blogs;
    });*/

    this.blogs = this.blogService.getBlogs();
  }

  // probably not really for http request which always ends after one item returned
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
