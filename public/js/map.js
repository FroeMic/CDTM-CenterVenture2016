var map;

var app = angular.module("mapview", ['leaflet-directive']);

app.config(function($logProvider){
    $logProvider.debugEnabled(false);
});

app.controller("MapController",  [ '$scope', '$http', 'leafletData', function($scope, $http, leafletData) {
    angular.extend($scope, {
        center: {
            lat: 48.143763,
            lng: 11.557979,
            zoom: 8
        },
        defaults: {
            scrollWheelZoom: false
        },
        tiles: {
            url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiYnJhbmRuZXJiIiwiYSI6ImNpdTQ5cHZwaTAwMjAyeW1wMXA4Y3QwZjYifQ.eBlCPEZnuSx7uGlM5A1aFQ',
            options: {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }
        }
    });

    $http.get('/map/plugins').then(function(resp) {
        $scope.datasets = resp.data;
    });
    $scope.datasetClicked = function (dataset) {
        // console.log('datasetclicked', dataset);
        var datasetId = dataset.name;
        var actions = {
            'Districts': loadDistricts,
            'Test': loadUrl.bind(undefined, dataset.url, markers)
        };

        if(!(datasetId in actions)) {
            console.error('dataset ' + datasetId + ' has no action!');
        } else {
            actions[datasetId](dataset.checked);
        }
    };

    var map;
    leafletData.getMap('map').then(function (res) {
        map = window.map = res;
        $(document).ready(function () {
            setTimeout(function () {
                map.flyTo(map.getCenter(), 11.5, {
                    animate: true,
                    duration: 1.5,
                    easeLinearity: 0.2
                });
            }, 3000)
        });
        // console.log('got map', res);
    });
    var layers = {};

    function loadDistricts(load) {
        if(load) {
            var customLayer = L.geoJson(null, {
                // http://leafletjs.com/reference.html#geojson-style
                onEachFeature: function (feature, layer) {
                    console.log('f,l:', feature, layer);
                    // var label = L.marker(layer.getBounds().getCenter(), {
                    //     icon: L.divIcon({
                    //         className: 'label',
                    //         html: feature.properties.name,
                    //         iconSize: [100, 40]
                    //     })
                    // }).addTo(map);
                    // layer.on('remove', function (ev) {
                    //     label.remove();
                    // });

                    layer.bindTooltip(feature.properties.name);
                }
            });

            var layer = omnivore.kml('/maps/public/munich-districts.kml', null, customLayer);
            layers['districts'] = layer;
            layer.addTo(map);
        } else {
            map.removeLayer(layers['districts']);
            layers['districts'] = undefined;
        }
    }

    var data = [];
    // load & cache (or hide) a resource and visualize with callback then(data)
    function loadUrl(url, then, load) { // then: function(data)
        var existing = data.filter(function (element, index, array) {
            return element.srcUrl == url;
        });
        if(load) {
            if(existing.length > 0) {
                existing[0].layer = then(existing[0].data);
            } else {
                // download fresh
                $http.get(url).then(function (response) {
                    data.push({
                        srcUrl: url,
                        data: response.data,
                        layer: then(response.data)
                    });
                });
            }
        } else {
            var layer = existing[0].layer;
            layer.remove();
            existing[0].layer = undefined;
        }
    }

    function markers(data) {
        var layer = L.layerGroup().addTo(map);
        data.forEach(function (val, idx, arr) {
            var marker = L.marker(val.latlong);
            var tooltip = val.badge ? (val.badge + ' requests') : val.match ? (val.match + '% match') : '';
            if(tooltip) {
                marker.bindTooltip(tooltip);
            }
            marker.addTo(layer);
        });
        return layer;
    }
}]);



(function($){
    $(function(){
        $('#sidebartoggle').click(function (btn) {
            var sidebar = $('.sidebar');
            var invisible = sidebar.is(':hidden');
            if(invisible) {
                sidebar.fadeIn();
            } else {
                sidebar.fadeOut();
            }
            $('#menu-btn').css('right', (invisible ? 310 : 10) + 'px');
        });
        // map = L.map('mapid').setView([48.143763, 11.557979], 12);
        // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiYnJhbmRuZXJiIiwiYSI6ImNpdTQ5cHZwaTAwMjAyeW1wMXA4Y3QwZjYifQ.eBlCPEZnuSx7uGlM5A1aFQ', {
        //     maxZoom: 18,
        //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        //     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        //     'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        //     id: 'mapbox.streets'
        // }).addTo(map);


    }); // end of document ready

})(jQuery); // end of jQuery name space
