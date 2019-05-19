/*global $, io, Blog*/
(function () {
    'use strict';

    const socket = io();
    const addCommentDiv = $('#addComment');
    const commentContent = $('#content');
    const postsElem = $('#posts');
    const loadMoreButton = $('#loadMore');
    let activeAddCommentButton;


    $('body').on('click', '.addComment', function () {
        if (activeAddCommentButton) {
            activeAddCommentButton.show();
        }
        activeAddCommentButton = $(this).after(addCommentDiv.show()).hide();
    });

    function endCommenting() {
        commentContent.val('');
        addCommentDiv.hide();
        activeAddCommentButton.show();
        activeAddCommentButton = null;
    }

    $('#add').click(e => {
        const postId = $(e.target).closest('.post').attr('id');
        $.post(`posts/${postId}/comments`, { content: commentContent.val() }, () => {
            endCommenting();
        }).fail(jqXhr => {
            console.error(jqXhr);
        });
    });

    $('#cancel').click(() => {
        endCommenting();
    });

    socket.on('comment', data => {
        /*$(`<h3>${data.comment.content}</h3>
        <h4>by ${data.comment.author} on ${data.comment.date}</h4>`)
            .appendTo($(`#${data.post} .comments`));*/
        $(data.comment).appendTo($(`#${data.post} .comments`));
    });

    socket.on('post', () => {
        Blog.numPosts++;
        updateLoadMoreButton();
    });

    loadMoreButton.click(() => {
        $.get('/morePosts', { skip: postsElem.children().length }, posts => {
            postsElem.append(posts);
            updateLoadMoreButton();
        });
    });

    function updateLoadMoreButton() {
        if (Blog.numPosts > postsElem.children().length) {
            loadMoreButton.prop('disabled', false);
        } else {
            loadMoreButton.prop('disabled', true);
        }
    }

    updateLoadMoreButton();
}());