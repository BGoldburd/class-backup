/*global google, $*/
(function () {
    'use strict';

    const location = { lat: 40.09680866454403, lng: -74.2213982035816 };

    const map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 2,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    });

    const infoWindow = new google.maps.InfoWindow({
        content: 'What goes here?',
        maxWidth: 250
    });

    const drawingManager = new google.maps.drawing.DrawingManager();
    drawingManager.setMap(map);

    const tagInput = $('#tag');
    const rowCountInput = $('#rows');
    const placesList = $('#placesList');
    const allMarkerBounds = new google.maps.LatLngBounds();
    let markers = [];
    let currentSummary;

    // using non nesting style just because...
    $('#go').click(getGeoNameData);

    function getGeoNameData() {
        $.getJSON('http://api.geonames.org/wikipediaSearch?username=slubowsky&type=json',
            { q: tagInput.val(), maxRows: rowCountInput.val() },
            processGeoNamesData);
    }

    function processGeoNamesData(geoNamesData) {
        // zoom to new stuff only
        // const allMarkerBounds = new google.maps.LatLngBounds();

        geoNamesData.geonames.forEach(place => {
            // add marker to map
            const location = { lat: place.lat, lng: place.lng };
            const marker = new google.maps.Marker({
                position: location,
                title: place.title,
                map: map,
                icon: place.thumbnailImg ? {
                    url: place.thumbnailImg,
                    scaledSize: new google.maps.Size(50, 50)
                } : null
            });

            marker.addListener('click', () => {
                infoWindow.setContent(`${place.summary}<br><small><a href="http://${place.wikipediaUrl}" target="_blank">see more</a></small>`);
                infoWindow.open(map, marker);
            });

            allMarkerBounds.extend(location);
            markers.push(marker);

            // add to sidebar
            let summaryShowing = false;
            $(`<li>
                    <img src="${place.thumbnailImg || 'https://png.icons8.com/ios/1600/camera.png'}" />
                    <span>${place.title}</span>
                    <div class="summary">${place.summary}</div>
               </li>`).appendTo(placesList)
                .click(function () {
                    const lastSummary = currentSummary;
                    currentSummary = $(this).find('.summary').slideDown();
                    if (lastSummary && !lastSummary.is(currentSummary)) {
                        lastSummary.slideUp();
                    }

                    map.panTo(location);
                    setTimeout(() => map.setZoom(18), 500);
                });
        });

        map.fitBounds(allMarkerBounds);
    }

    $('#clear').click(() => {
        placesList.empty();
        markers.forEach(marker => {
            marker.setMap(null);
        });
        markers = [];
    });

    google.maps.event.addListener(drawingManager, 'overlaycomplete', event => {
        if (event.type === 'marker') {
            localStorage.marker = JSON.stringify({ lat: event.overlay.position.lat(), lng: event.overlay.position.lng() });
        } else if (event.type === 'rectangle') {
            map.fitBounds(event.overlay.bounds);
        }
        console.log('overlaycomplete:', event);
    });

    if (localStorage.marker) {
        const loc = JSON.parse(localStorage.marker);

        new google.maps.Marker({
            position: { lat: loc.lat, lng: loc.lng },
            title: 'marker from last time',
            map: map
        });
    }
}());