/*global google*/
(function () {
    'use strict';

    window.initMap = function () {
        const location = { lat: 40.09680866454403, lng: -74.2213982035816 };

        const map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `Beth Medrash Govoha
            בית מדרש גבוה‬
            The old Beis Madrash Building of BMG.jpg
            The original Beis Medrash Building of Beth Medrash Govoha
            Type	Private
            Established	1943
            Affiliation	Orthodox Judaism
            Students	6,500 (Fall 2012)[1]
            Location	Lakewood, NJ, USA
            40.0955°N 74.222°WCoordinates: 40.0955°N 74.222°W
            Campus	Urban
            Beth Medrash Govoha (Hebrew: בית מדרש גבוה‬, lit: Higher, or advanced, House of Study) is a Haredi yeshiva and kollel located in Lakewood, New Jersey. It is commonly known as BMG, or Lakewood Yeshiva.
            
            As of 2012, the yeshiva has 6,500 married and undergraduate students,[1][2] making it the largest yeshiva in the United States[3] and one of the largest yeshivas in the world. Over the years, the roshei yeshiva of BMG have all been associated with the Kotler family, beginning with Rabbi Aharon Kotler from 1943 until his death in 1962; Rabbi Shneur Kotler, his son, who led the yeshiva from 1962 until his death in 1982; and the present roshei yeshiva, Rabbi Malkiel Kotler (son of Harav Shneur Kotler), Rabbi Dovid Schustal (son-in-law of Harav Shneur Kotler), Rabbi Yerucham Olshin and Rabbi Yisroel Neuman (sons-in-law of Rabbi Dov Schwartzman).[1] Rabbis Olshin, Schustal and Neuman are married to grandchildren of Rabbi Aharon Kotler. The CEO of the yeshiva is Aron Kotler, the brother of Harav Malkiel Kotler and a grandson of Harav Aharon Kotler.
            
            To manage the huge enrollment, the four roshei yeshiva divide up the times they deliver shiurim (Torah lectures) in the various battei medrash (study halls) on campus.[4] There are also 240 roshei chabura (heads of small study groups) who guide and encourage groups of students in the yeshiva's trademark style of independent learning.<br><a target="_blank" href="https://en.wikipedia.org/wiki/Beth_Medrash_Govoha">see more</a>`
        });

        const marker = new google.maps.Marker({
            position: location,
            title: 'BMG',
            map: map,
            icon: {
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkScnqTQJrcxECIZkwr0-hZsC1a0cqhrphfOFOoLf0hVTbbD4r',
                scaledSize: new google.maps.Size(50, 50)
            }
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        map.addListener('center_changed', event => {
            const loc = map.getCenter();
            console.log(loc.lat(), loc.lng());
        });
    };

}());
