var LENGTH = 6;

var app = angular.module('radiotQuotesApp', []);

app.controller('Quote', function($scope, $http, $timeout) {
    $scope.getRandomQuote = function() {
        if ($scope.moreDisabled === true) return;

        var quoteId = Math.floor(Math.random() * LENGTH),
            url = 'json/' + zfill(quoteId, 5) + '.json',
            loading = $timeout(function() {
                $scope.quote = undefined;
            }, 100);

        $scope.moreDisabled = true;

        $http.get(url).success(function(data, status, headers, config) {
            $scope.moreDisabled = false;
            $timeout.cancel(loading);
            $scope.quote = data;
        });
    };
});

function zfill(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
