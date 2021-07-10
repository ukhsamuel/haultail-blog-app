import { Component, OnInit } from '@angular/core'
import { GestureEventData } from '@nativescript/core';
import { Observable, Subscription } from 'rxjs';

import { PostService } from './posts.service';
import { Post } from './post'

@Component({
    selector: 'ns-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css'],
    moduleId: module.id
})
export class PostsComponent implements OnInit {
    // initialize array of posts
    posts: Array<Post>
    // initialize posts observable
    loadPostService$: Subscription;
    // post loading flag
    loadingPosts = true;
    // logo url
    logo = "https://www.haultail.com/wp-content/themes/haultail/images/user-haultail.png"

    constructor(private postService: PostService) {
    }

    ngOnInit(): void {
        // call method to retrieve posts
        this.getPosts();
    }

    getPosts() {
        // set loading flag as true
        this.loadingPosts = true;
        // subscribe to api service
        this.loadPostService$ = this.postService
            .getPosts$()
            .subscribe(
                (result: any) => {
                    this.posts = result;
                    // set loading flag as false
                    this.loadingPosts = false;
                },
                (err: any) => {
                    // handle error
                    alert("opps!: unable to load posts at the moment");
                    // set loading flag as false
                    this.loadingPosts = false;
                })
    }


    ngOnDestroy() {
        // unsubscribe from posts observeable
        this.loadPostService$.unsubscribe();
    }

    onPostTap(post) {
        // pass posts to observable
        this.postService.updatePostDetails(post)
    }
}