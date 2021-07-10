import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Post } from './post'

@Injectable({
    providedIn: 'root',
})
export class PostService {

    public postSource = new BehaviorSubject<Post>(null);
    postDetails$ = this.postSource.asObservable();
    baseUrl = 'https://www.haultail.com/wp-json/haultail_news/v1';

    constructor(
        private http: HttpClient
    ) { }

    // make call to get posts
    getPosts$() {
        return this.DOGET('/posts/10/1');
    }


    //=======================UPDATE POST DETAILS========================================

    updatePostDetails(postDetails: Post) {
        this.postSource.next(postDetails);
    }


    DOGET(url: string) {
        return this.http.get<any>(this.baseUrl + url);
    }
}
