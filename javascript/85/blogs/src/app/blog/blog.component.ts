import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogService } from '../shared/blog-service';
import { Observable } from 'rxjs';
import { Post } from '../shared/post';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: Observable<Post[]>;
  constructor(private route: ActivatedRoute,
    private blogService: BlogService) { }

  ngOnInit() {
    // const blogId = +this.route.snapshot.paramMap.get('blogId');
    // this.posts = this.blogService.getPosts(blogId);
    /*this.route.paramMap.subscribe(params => {
      this.posts = this.blogService.getPosts(+params.get('blogId'));
    });*/

    this.posts = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.blogService.getPosts(+params.get('blogId')))
    );
  }

}
