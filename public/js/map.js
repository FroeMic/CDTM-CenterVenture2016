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
            'Test': loadUrl.bind(undefined, dataset.url, markers),
            'Rents': loadUrl.bind(undefined, dataset.url, rent)
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
            }, 1000)
        });
        // console.log('got map', res);
    });
    var layers = {};

    function loadDistricts(load) {
        if(load) {
            var customLayer = L.geoJson(null, {
                // http://leafletjs.com/reference.html#geojson-style
                onEachFeature: function (feature, layer) {
                    layer.bindTooltip(feature.properties.description + " " + feature.properties.name);
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
            var tooltip = val.badge ? (val.badge) : val.match ? (((val.match * 100) % 100) + '%') : '';
            var badge = '<div class="marker-badge"><span class="standalone no-wrap">' + tooltip + '</span></div>';
            var html = (tooltip ? badge : '') + '<img class="marker-img" src="https://unpkg.com/leaflet@1.0.1/dist/images/marker-icon-2x.png" style="bottom:' + (tooltip ? 11 : 0) + 'px;"/>';
            var marker = L.marker(val.latlong, {
                riseOnHover: true,
                icon: L.divIcon({
                    className: 'label autosize-label marker',
                    html: html,
                    iconSize: [30, tooltip ? 60 : 41],
                    iconAnchor: [15, tooltip ? 60 : 41]
                })
            });

            var marker2 = L.marker(val.latlong).addTo(layer);
            marker.addTo(layer);
        });
        return layer;
    }

    function rent(data) {
        return coloredArea(data, '€');
    }

    function coloredArea(data, suffix) {
        // we expect data to be an array of { district: <id>, value: <v>  ... } objects, then pull in
        // district kml and color features based on values
        var values = data.map(function (x) {
            return x.rent;
        });
        var max = Math.max.apply(null, values);
        var min = Math.min.apply(null, values);

        function color(value) {
            var normalized = (value - min) / (max - min);
            var colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026' ];
            var idx = Math.round(normalized * colors.length);
            return colors[Math.max(0, Math.min(colors.length - 1, idx))];
        }

        var valueMap = {};
        data.forEach(function (x, idx, arr) {
            valueMap[x._id] = x.rent;
        });

        // pull districts (stolen from loadDistricts())
        var customLayer = L.geoJson(null, {
            // http://leafletjs.com/reference.html#geojson-style
            onEachFeature: function (feature, layer) {
                var value = valueMap[parseInt(feature.properties.description)];
                var formatted = Math.round(value);
                layer.bindTooltip(feature.properties.name + ': <strong>' + formatted + suffix + '</strong>');
            },
            style: function (feature) {
                var value = valueMap[parseInt(feature.properties.description)];
                return {
                    weight: 2,
                    opacity: 0.7,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.5,
                    fillColor: color(value)
                };
            }
        });

        return omnivore.kml('/maps/public/munich-districts.kml', null, customLayer).addTo(map);
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
    }); // end of document ready

})(jQuery); // end of jQuery name space
