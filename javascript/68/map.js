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

    const drawingManager = new google.maps.drawing.DrawingManager({
        markerOptions: {
            draggable: true
        },
        circleOptions: {
            draggable: true,
            editable: true
        },
        polylineOptions: {
            draggable: true,
            editable: true
        },
        rectangleOptions: {
            draggable: true,
            editable: true
        },
        polygonOptions: {
            draggable: true,
            editable: true
        },

    });
    drawingManager.setMap(map);

    const tagInput = $('#tag');
    const rowCountInput = $('#rows');
    const placesList = $('#placesList');
    const allMarkerBounds = new google.maps.LatLngBounds();
    let markers = [];
    let drawings = [];
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

    google.maps.event.addListener(drawingManager, 'markercomplete', marker => {
        const markerData = { type: 'marker', position: marker.position };
        drawings.push(markerData);
        localStorage.drawings = JSON.stringify(drawings);

        handleMarkerEdits(markerData, marker);
    });

    function handleMarkerEdits(markerData, marker) {
        marker.addListener('dragend', () => {
            markerData.position = marker.position;
            localStorage.drawings = JSON.stringify(drawings);
        });
    }

    google.maps.event.addListener(drawingManager, 'circlecomplete', circle => {
        const circleData = { type: 'circle', center: circle.center, radius: circle.radius };
        drawings.push(circleData);
        localStorage.drawings = JSON.stringify(drawings);

        handleCircleEdits(circleData, circle);
    });

    function handleCircleEdits(circleData, circle) {
        circle.addListener('center_changed', () => {
            circleData.center = circle.center;
            localStorage.drawings = JSON.stringify(drawings);
        });

        circle.addListener('radius_changed', () => {
            circleData.radius = circle.radius;
            localStorage.drawings = JSON.stringify(drawings);
        });
    }

    google.maps.event.addListener(drawingManager, 'rectanglecomplete', rectangle => {
        drawings.push({ type: 'rectangle', bounds: rectangle.bounds });
        localStorage.drawings = JSON.stringify(drawings);
    });

    google.maps.event.addListener(drawingManager, 'polylinecomplete', polyline => {
        drawings.push({ type: 'polyline', path: polyline.getPath().getArray() });
        localStorage.drawings = JSON.stringify(drawings);
    });

    google.maps.event.addListener(drawingManager, 'polygoncomplete', polygon => {
        const polygonData = { type: 'polygon', path: polygon.getPath().getArray() };
        drawings.push(polygonData);
        localStorage.drawings = JSON.stringify(drawings);

        handlePolygonEdits(polygonData, polygon);
    });

    function handlePolygonEdits(polygonData, polygon) {
        function resavePolygon() {
            polygonData.path = polygon.getPath().getArray();
            localStorage.drawings = JSON.stringify(drawings);
        }

        google.maps.event.addListener(polygon.getPath(), 'insert_at', function () {
            resavePolygon();
        });

        google.maps.event.addListener(polygon.getPath(), 'remove_at', function () {
            resavePolygon();
        });

        google.maps.event.addListener(polygon.getPath(), 'set_at', function () {
            resavePolygon();
        });

        google.maps.event.addListener(polygon, 'dragend', function () {
            resavePolygon();
        });
    }

    if (localStorage.drawings) {
        drawings = JSON.parse(localStorage.drawings);
        drawings.forEach(drawing => {
            switch (drawing.type) {
                case 'marker':
                    const marker = new google.maps.Marker({
                        position: drawing.position,
                        map: map,
                        draggable: true
                    });
                    handleMarkerEdits(drawing, marker);
                    break;
                case 'circle':
                    const circle = new google.maps.Circle({
                        center: drawing.center,
                        radius: drawing.radius,
                        map: map,
                        draggable: true,
                        editable: true
                    });
                    handleCircleEdits(drawing, circle);
                    break;
                case 'rectangle':
                    new google.maps.Rectangle({
                        bounds: drawing.bounds,
                        map: map,
                        draggable: true,
                        editable: true
                    });
                    break;
                case 'polyline':
                    new google.maps.Polyline({
                        path: drawing.path,
                        map: map,
                        draggable: true,
                        editable: true
                    });
                    break;
                case 'polygon':
                    const polygon = new google.maps.Polygon({
                        path: drawing.path,
                        map: map,
                        draggable: true,
                        editable: true
                    });
                    handlePolygonEdits(drawing, polygon);
                    break;
                default:
                    console.error('Cant reconstitute', drawing);
            }
        });
    }
}());