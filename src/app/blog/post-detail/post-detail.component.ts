import { Component, OnInit } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular';

import { Post } from '../posts/post'
import { PostService } from '../posts/posts.service'

@Component({
    selector: 'ns-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css'],
    moduleId: module.id
})
export class PostDetailComponent implements OnInit {
    post: Post;

    constructor(
        private postService: PostService,
        public routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        // retrieve selected post details from observable
        this.postService.postDetails$.subscribe(
            (details) => {
                this.post = details;
            }
        );
    }

    goBack() {
        // back button event
        this.routerExtensions.back()
    }
}