var LENGTH = 2;

var app = angular.module('radiotQuotesApp', []);

app.controller('Quote', function($scope, $http) {
    $scope.random = function() {
        var quoteId = Math.floor(Math.random() * LENGTH),
            url = 'json/' + zfill(quoteId, 5) + '.json';
        $http.get(url).success(function(data, status, headers, config) {
            $scope.quote = data;
        });
    };
});

function zfill(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
