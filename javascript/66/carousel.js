/*global $*/

(function () {
    'use strict';

    let pictures;
    let index = 0;
    const tagInput = $('#tag');
    const picture = $('#picture img');
    const title = $('#picture h2');

    function refreshPicture() {
        picture.attr('src', pictures[index].url);
        title.text(pictures[index].title);
    }

    $('#go').click(() => {
        $.getJSON('https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=?',
            { tags: tagInput.val() }, pictureData => {
                pictures = pictureData.items.map(item => ({ title: item.title, url: item.media.m }));

                refreshPicture();

                /*pictureData.items.forEach(picture => {
                    pictureElem.append(`<figure>
                                            <img src="${picture.media.m}"/>
                                            <figcaption>
                                                <h2>${picture.title}</h2>
                                            </figcaption>
                                        </figure>`);*/
            });
    });

    $('#left').click(() => {
        if (--index < 0) {
            index = pictures.length - 1;
        }
        refreshPicture();
    });

    $('#right').click(() => {
        if (++index === pictures.length) {
            index = 0;
        }
        refreshPicture();
    });
}());