import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BlogService } from '../shared/blog-service';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { Post } from '../shared/post';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {
  posts: Post[];
  postsToShow: Post[];

  sub: Subscription;
  index = 0;
  numPostsToShow = 3;

  constructor(private route: ActivatedRoute,
    private blogService: BlogService) { }

  ngOnInit() {
    this.sub = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.blogService.getPosts(+params.get('blogId')))
    ).subscribe(posts => {
      this.posts = posts;
      this.updatePosts();
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  updatePosts() {
    this.postsToShow = this.posts.slice(this.index, this.index + this.numPostsToShow);
  }

  previous() {
    this.index -= this.numPostsToShow;
    this.updatePosts();
  }

  next() {
    this.index += this.numPostsToShow;
    this.updatePosts();
  }
}
