/*global $*/
//(function () {
//$.when($.ready).then(function () {
$(function () {
    'use strict';

    const player = $('#player');

    $.getJSON('videos.json', videos => {
        const videoList = $('#videoList');
        videos.forEach(video => {
            $(`<li>
                    <img src="${video.picture || 'media/images/default.png'}" alt="${video.title}" />
                    <span>${video.title}</span>
               </li>
            `).appendTo(videoList)
                .click(function () {
                    player.attr('src', video.url);
                    //player[0].play();
                    $(this).css('color', 'lightgray');
                });
        });

        console.log(videos);
    });
});
//}());