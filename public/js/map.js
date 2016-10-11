var map;

var app = angular.module("mapview", ['leaflet-directive']);
app.controller("MapController", [ '$scope', function($scope) {
    angular.extend($scope, {
        center: {
            lat: 40.095,
            lng: -3.823,
            zoom: 4
        },
        defaults: {
            scrollWheelZoom: false
        }
    });
}]);

app.controller('DatasetCtrl', function($scope, $http){
            $http.get('/map/plugins').then(function(resp) {
                $scope.datasets = resp.data;
            });
            $scope.datasetClicked = function (dataset) {
                // console.log('datasetclicked', dataset);
                var datasetId = dataset.name;
                var actions = {
                    'districts': loadDistricts
                };

                if(!(datasetId in actions)) {
                    console.error('dataset ' + datasetId + ' has no action!');
                } else {
                    actions[datasetId](!dataset.checked);
                }
            }
    });

    $(function(){
        $('.button-collapse').sideNav({
            menuWidth: 300,
            edge: 'right'
        });
        $('.parallax').parallax();
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
        map = L.map('mapid').setView([48.143763, 11.557979], 12);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiYnJhbmRuZXJiIiwiYSI6ImNpdTQ5cHZwaTAwMjAyeW1wMXA4Y3QwZjYifQ.eBlCPEZnuSx7uGlM5A1aFQ', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(map);


    }); // end of document ready

    var layers = {};

    function loadDistricts(load) {
        if(load) {
            var layer = omnivore.kml('/maps/public/munich-districts.kml');
            layers['districts'] = layer;
            layer.addTo(map);
        } else {
            map.removeLayer(layers['districts']);
            layers['districts'] = undefined;
        }
    }
})(jQuery); // end of jQuery name space
