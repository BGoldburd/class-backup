/*global $*/
(function () {
    'use strict';

    const titleElem = $('#title');
    const contentElem = $('#content');

    function setPage(page) {
        titleElem.text(page.title);
        contentElem.empty().append(page.content);
    }

    function showPostsPage(blog) {
        let posts;
        let postIndex = 0;
        let postsElement;
        let prevButton;
        let nextButton;
        const numPostsToShow = 3;

        function createPostElement(post) {
            let commentsElem;
            let showCommentsButton;

            function showComments(successCallback) {
                function createCommentElement(comment) {
                    return $(`<div class="comment">
                                <div>${comment.body}</div>
                                <div class="title"><strong>${comment.name}</strong> ${comment.email}</div>
                            </div>`);
                }

                $.getJSON('https://jsonplaceholder.typicode.com/comments',
                    { postId: post.id }, commentList => {
                        commentsElem.empty();
                        commentList.forEach(comment => {
                            commentsElem.append(createCommentElement(comment));
                        });

                        successCallback();
                    });
            }

            let commentsShowing = false;

            const postElement = $(`<div class="post">
                        <div class="title">${post.title} ${post.id}</div>
                        <div>${post.body}</div>
                        <button>show comments</button>
                        <div class="comments"></div>
                    </div>`);

            commentsElem = postElement.find('.comments');

            showCommentsButton = postElement.find('button').click(() => {
                // commentsShowing = !commentsShowing;
                if (commentsShowing) {
                    commentsElem.slideUp();
                    commentsShowing = false;
                    showCommentsButton.text('show comments');
                } else {
                    showComments(() => {
                        commentsElem.slideDown();
                        commentsShowing = true;
                        showCommentsButton.text('hide comments');
                    });
                }
            });

            return postElement;
        }

        function updatePosts() {
            postsElement.empty();
            if (postIndex === 0) {
                prevButton.prop('disabled', true);
            } else {
                prevButton.prop('disabled', false);
            }

            if (postIndex >= posts.length - numPostsToShow) {
                nextButton.prop('disabled', true);
            } else {
                nextButton.prop('disabled', false);
            }

            for (let i = postIndex; i < postIndex + numPostsToShow && i < posts.length; i++) {
                postsElement.append(createPostElement(posts[i]));
            }
        }

        $.getJSON('https://jsonplaceholder.typicode.com/posts',
            { userId: blog.id }, postList => {
                posts = postList;

                const content = $(`<div>
                                       <div class="posts"></div>
                                       <button id="prev">prev</button>
                                       <button id="next">next</button>
                                   </div>`);

                postsElement = content.find('.posts');

                prevButton = content.find('#prev').click(() => {
                    postIndex -= numPostsToShow;
                    updatePosts();
                });

                nextButton = content.find('#next').click(() => {
                    postIndex += numPostsToShow;
                    updatePosts();
                });

                updatePosts();

                setPage({
                    title: `${blog.name}'s Posts`,
                    content: content
                });
            });
    }

    function showBlogListPage() {
        const blogs = [];

        function createBlogElement(blog) {
            return $(`<div class="blog">
                        <div class="title">${blog.name}</div>
                        <div><strong>${blog.website}</strong></div>
                        <small>
                            ${blog.company.name}<br>
                            ${blog.company.catchPhrase}</br>
                            ${blog.company.bs}
                        </small>
                    </div>`).click(() => {
                    showPostsPage(blog);
                });
        }

        $.getJSON('https://jsonplaceholder.typicode.com/users', blogList => {
            blogList.forEach(blog => {
                blogs.push(createBlogElement(blog));
            });

            setPage({
                title: 'Blog List',
                content: blogs
            });
        });
    }

    // added after class
    $('#home').click(showBlogListPage);

    showBlogListPage();
}());